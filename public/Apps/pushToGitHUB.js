/**
 * NEXUS OS COMMAND ENGINE v6.0
 * Native Webhook & Integration Endpoint for Gemini Mobile, Drive, Docs, and Sheets.
 * Do NOT deploy as an unrestricted "Execute as: Me / Anyone" web app.
 * Require Google account access restrictions wherever possible, and set a
 * unique 32+ character MISSION_KEY only in Apps Script Script Properties.
 * If this sample was deployed previously, redeploy and rotate its old key.
 */

function doPost(e) {
  try {
    // Reject malformed and oversized payloads before using privileged services.
    const raw = e && e.postData && e.postData.contents;
    if (typeof raw !== "string" || raw.length > 32768) {
      return response({ error: "INVALID_REQUEST" });
    }
    const data = JSON.parse(raw);
    if (!data || typeof data !== "object" || Array.isArray(data)) {
      return response({ error: "INVALID_REQUEST" });
    }
    const props = PropertiesService.getScriptProperties();

    // Deny by default: there is deliberately NO published fallback key.
    const storedMissionKey = props.getProperty("MISSION_KEY");
    if (!validMissionKey(storedMissionKey)) {
      return response({ error: "SERVICE_NOT_CONFIGURED" });
    }
    if (!validMissionKey(data.missionKey) || !secureKeyEquals(data.missionKey, storedMissionKey)) {
      return response({ error: "UNAUTHORIZED_NODE" });
    }

    // 2. Action Routing
    switch (data.action) {

      // --- GOOGLE SHEETS AUTOMATION ---
      case "updateSheet":
        return response(updateSheetData(data.spreadsheetId, data.sheetName, data.rowValues, data.appendMode));

      case "readSheet":
        return response(readSheetData(data.spreadsheetId, data.sheetName));

      // --- GOOGLE DRIVE & DOCS AUTOMATION ---
      case "createFolder":
        return response(createDriveFolder(data.folderName, data.parentId));

      case "createFile":
        return response(createDriveFile(data.fileName, data.content, data.mimeType, data.folderId));

      case "organizeDrive":
        return response(executeOrganizationProtocol(data.structure));

      // --- GITHUB DISPATCH (PROXIED SAFELY) ---
      case "githubPush":
        const githubToken = props.getProperty("GITHUB_TOKEN");
        const repoOwner = props.getProperty("GITHUB_OWNER");
        const repoName = props.getProperty("GITHUB_REPO");
        if (!githubToken || !repoOwner || !repoName) {
          return response({ error: "GITHUB_DISPATCH_NOT_CONFIGURED" });
        }
        return response(pushToGitHub(data.path, data.content, data.message, githubToken, repoOwner, repoName));

      // --- SYSTEM HEALTH ---
      case "PING":
        return response({ "status": "ONLINE", "timestamp": new Date().toISOString() });

      default:
        return response({ error: "INVALID_ACTION" });
    }

  } catch (_) {
    // Do not expose internal errors, file IDs, or credential-bearing URLs.
    return response({ error: "REQUEST_FAILED" });
  }
}

function validMissionKey(value) {
  return typeof value === "string" && value.length >= 32 && value.length <= 256;
}

function secureKeyEquals(received, expected) {
  // Compare fixed-length SHA-256 digests, not the potentially variable-size key.
  const a = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, received);
  const b = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, expected);
  let difference = 0;
  for (let i = 0; i < a.length; i++) difference |= a[i] ^ b[i];
  return difference === 0;
}

/**
 * Appends or updates rows in a targeted Google Sheet
 */
function updateSheetData(spreadsheetId, sheetName, rowValues, appendMode) {
  try {
    const ss = spreadsheetId ? SpreadsheetApp.openById(spreadsheetId) : SpreadsheetApp.getActiveSpreadsheet();
    const sheet = sheetName ? ss.getSheetByName(sheetName) : ss.getSheets()[0];
    
    if (!sheet) return { "status": "ERROR", "message": "Sheet not found" };

    if (appendMode !== false) {
      sheet.appendRow(rowValues);
      return { "status": "SUCCESS", "action": "ROW_APPENDED", "row": sheet.getLastRow() };
    } else {
      // Overwrite first row or header
      sheet.getRange(1, 1, 1, rowValues.length).setValues([rowValues]);
      return { "status": "SUCCESS", "action": "ROW_UPDATED" };
    }
  } catch (e) {
    return { "status": "ERROR", "message": "SHEET_OPERATION_FAILED" };
  }
}

/**
 * Reads row data from a targeted Google Sheet
 */
function readSheetData(spreadsheetId, sheetName) {
  try {
    const ss = spreadsheetId ? SpreadsheetApp.openById(spreadsheetId) : SpreadsheetApp.getActiveSpreadsheet();
    const sheet = sheetName ? ss.getSheetByName(sheetName) : ss.getSheets()[0];
    const data = sheet.getDataRange().getValues();
    return { "status": "SUCCESS", "data": data };
  } catch (e) {
    return { "status": "ERROR", "message": "SHEET_OPERATION_FAILED" };
  }
}

/**
 * Standardized JSON Response Formatter
 */
function response(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}