import { circuitMain, Circuit, Group, Scalar } from 'o1js';
import { SRS } from '../SRS.js';

let srs = SRS.createFromJSON();
let h = srs.h;

export class Verifier extends Circuit {
  @circuitMain
  static main() {
    let points: Group[] = [h];
    let scalars: Scalar[] = [Scalar.from(0)];

    Verifier.msm(points, scalars).assertEquals(Group.zero);
  }

  // Naive algorithm
  static msm(points: Group[], scalars: Scalar[]) {
    let result = Group.zero;

    for (let i = 0; i < points.length; i++) {
      let point = points[i];
      let scalar = scalars[i];
      result.add(point.scale(scalar));
    }

    return result;
  }
}
