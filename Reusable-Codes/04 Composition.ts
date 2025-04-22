// Inheritance
// Characterized by an 'is a' relationship between two classes.
// When there is a clear hierarchical relationship between classes.
// When you want to share behavior across multiple classes.
// When the child class is a specialized version of the parent class.

// Composition
// Characterized by a 'has a' relationship between two classes.
// Composition is a design principle where a class is composed of one or more objects of other classes.
// When you want to build complex objects by combining simpler ones.
// When you need flexibility to change behavior at runtime.
// When you want to avoid the pitfalls of deep inheritance hierarchies.

import fs from 'fs';
import { MatchReader } from './03 Generics';

enum MatchResult {
  HomeWin = 'H',
  AwayWin = 'A',
  Draw = 'D'
}

type MatchData = [
  Date,
  string,
  string,
  number,
  number,
  MatchResult,
  string
];


interface Analyzer {
  run(matches: MatchData[]): string;
}

interface OutputTarget {
  print(report: string): void;
}

class Summary {
  constructor(public analyzer: Analyzer, public outputTarget: OutputTarget) {}

  buildAndPrintReport(matches: MatchData[]): void {
    const output = this.analyzer.run(matches);
    this.outputTarget.print(output);
  }
}


class WinsAnalysis implements Analyzer {
  constructor(public team: string) {}

  run(matches: MatchData[]): string {
    let wins = 0;

    for (let match of matches) {
      if (match[1] === 'Man United' && match[5] === MatchResult.HomeWin) {
        wins++;
      } else if (
        match[2] === 'Man United' &&
        match[5] === MatchResult.AwayWin
      ) {
        wins++;
      }
    }

    return `Team ${this.team} won ${wins} games`;
  }
}

class HtmlReport implements OutputTarget {
  print(report: string): void {
    const html = `
      <div>
        <h1>Analysis Output</h1>
        <div>${report}</div>
      </div>
    `;

    fs.writeFileSync('report.html', html);
  }
}

const matchReader = new MatchReader('football.csv');
const summary = new Summary(new WinsAnalysis('Blob'), new HtmlReport());

matchReader.read();
summary.buildAndPrintReport(matchReader.data);