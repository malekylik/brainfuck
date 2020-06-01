import { Opcode } from './opcode';
import { OpKind } from './opcode-kinds';

interface DoubeLinkedNode<T> {
  prev_prt: DoubeLinkedNode<T>,
  next_prt: DoubeLinkedNode<T>,
  value: T,
}

export type OpcodeNode = DoubeLinkedNode<Opcode>;

export function conver_array_to_double_linked_list<T>(values: Array<T>): DoubeLinkedNode<T> {
  if (values.length === 0) {
    return null;
  }

  const head: DoubeLinkedNode<T> = {
    prev_prt: null,
    next_prt: null,
    value: values[0]
  };

  let current = head;
  for (let i = 1; i < values.length; i++) {
    let next_node: DoubeLinkedNode<T> = {
      prev_prt: current,
      next_prt: null,
      value: values[i]
    };

    current.next_prt = next_node;

    current = next_node;
  }

  return head;
}

export function conver_double_linked_list_to_array<T>(head: DoubeLinkedNode<T>): Array<T> {
  if (head === null) {
    return null;
  }

  let array_size = 1;
  let current = head.next_prt;

  while (current) {
    array_size++;

    current = current.next_prt;
  }

  const arr = new Array(array_size);

  arr[0] = head.value;

  for (let i = 1, current = head.next_prt; i < array_size; i++) {
    arr[i] = current.value;

    current = current.next_prt;
  }

  return arr;
}

export const conver_opcodes_to_list: (ops: Array<Opcode>) => OpcodeNode = conver_array_to_double_linked_list;
export const conver_list_to_opcodes: (head: OpcodeNode) => Array<Opcode> = conver_double_linked_list_to_array;

interface CodeFrame {
  ops_start_ptr: OpcodeNode,
  loop_list: OpcodeNode,
  loop_count: number,
  loop_depth: number,
  updater: OpcodeNode,
  is_pure: boolean,
}

// export function createCodeFrames(head: OpcodeNode, current_depth: number): CodeFrame {
//   const loop_ptrs: Array<OpcodeNode> = [];

//   let current = head;
//   const buffer_size = 60000;
//   const loop_count = new Uint8Array(buffer_size);
//   const middle = (buffer_size / 2) | 0;
//   let loop_depth = 0;
//   let offset = 0;
//   let is_pure = true;

//   while (current) {
//     const op = current.value;

//    if (op.kind === OpKind.JUMP_IF_DATA_ZERO) {
//       is_pure = is_pure && false;

//       if (loop_depth === 0) {
//         loop_ptrs.push(current);
//       }

//       loop_depth += 1;
//     } else if (op.kind === OpKind.JUMP_IF_DATA_NOT_ZERO) {
//       loop_depth -= 1;
//     }

//     if (loop_depth === 0 && op.kind === OpKind.INC_DATA) {
//       loop_count[middle + offset] += op.argument;
//     } else if (loop_depth === 0 && op.kind === OpKind.DEC_DATA) {
//       loop_count[middle + offset] -= op.argument;
//     }

//     // TO_DO check if this can break optimization
//     is_pure = is_pure && !(op.kind === OpKind.LOOP_MOVE_PTR);
//     is_pure = is_pure && !(op.kind === OpKind.LOOP_MOVE_DATA);
//     is_pure = is_pure && !(op.kind === OpKind.RESET_DATA_RANGE);

//     // check if counter of data_loop updated from outer loop
//     if (loop_depth === 0 && op.kind === OpKind.DATA_LOOP && loop_count[middle + offset] !== 0) {
//       is_pure = false;
//     }

//     current = current.next_prt;
//   }
// }
