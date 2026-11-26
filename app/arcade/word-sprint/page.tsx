import type { Metadata } from 'next';
import { WordSprint } from '../../../components/WordSprint';

export const metadata: Metadata = {
  title: 'Word Sprint | Nicholai.Online',
  description: 'Practice typing speed and accuracy in a 30-second arcade round.',
};

export default function WordSprintPage() {
  return (
    <section className="container page narrow">
      <h1>Word Sprint</h1>
      <WordSprint />
    </section>
  );
}
