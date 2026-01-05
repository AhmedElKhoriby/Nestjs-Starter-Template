import { Injectable } from '@nestjs/common';

class Icon {
  constructor(
    public type: string,
    public imageData: string,
    public size: number,
  ) {
    console.log(`[Flyweight] Creating new icon object for type: ${type}`);
  }

  render(x: number, y: number, color: string): string {
    return `Rendering ${this.type} icon at (${x},${y}) with color ${color}`;
  }
}

@Injectable()
export class IconFactory {
  private icons: Map<string, Icon> = new Map();

  getIcon(type: string): Icon {
    if (!this.icons.has(type)) {
      console.log(`[Factory] Creating flyweight for: ${type}`);
      const icon = new Icon(type, `${type}_image_data`, 1024);
      this.icons.set(type, icon);
    } else {
      console.log(`[Factory] Reusing flyweight for: ${type}`);
    }

    return this.icons.get(type)!;
  }

  getStats() {
    return {
      totalFlyweights: this.icons.size,
      types: Array.from(this.icons.keys()),
      memorySaved: `Reusing ${this.icons.size} flyweights instead of creating duplicates`,
    };
  }
}
