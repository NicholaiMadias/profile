import type { Metadata } from 'next';
import MatrixGame from '../../nexus-os/matrix-of-conscience/MatrixGame';

export const metadata: Metadata = { title: 'Nexus Defense | Arcade' };

export default function TowerDefensePage() {
  return <MatrixGame initialLevel={1} />;
}
