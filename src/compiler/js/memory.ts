// const {name} = new Uint8Array({size});

const tx = new TextEncoder();

const Names = {
  getName(name: string): Array<number> {
    return Array.from(tx.encode(name));
  }
};

const Numbers = {
  getInt(int: number): Array<number> {
    return Array.from(tx.encode(String(int)));
  }
}

const ReservedNames = {
  // new
  getNew(): Array<number> {
    return [110, 101, 119];
  },
}

const VarDeclaration = {
  // const
  getConst(): Array<number> {
    return [99, 111, 110, 115, 116];
  },
}

const Punctuation = {
  // ' '
  getSpace(): Array<number> {
    return [32];
  },

  // '('
  getOpenBracket(): Array<number> {
    return [40];
  },

  // ')'
  getCloseBracket(): Array<number> {
    return [41];
  },

  // ;
  getEndLine(): Array<number> {
    return [59];
  },

  // =
  getAssigne(): Array<number> {
    return [61];
  },
}

const GlobalName = {
  // Uint8Array
  getUint8Array(): Array<number> {
    return [85, 105, 110, 116, 56, 65, 114, 114, 97, 121];
  },
}

const Function = {
  // {name}()
  getFunctionCall(functionName: Array<number>): Array<number> {
    return functionName.concat(
      Punctuation.getOpenBracket(),
      Punctuation.getCloseBracket(),
    );
  },

  // new {name}()
  getConstructorCall(functionName: Array<number>): Array<number> {
    return ReservedNames.getNew().concat(
      Punctuation.getSpace(),
      Function.getFunctionCall(functionName),
    );
  },
}

export function createMemory(name: string, size: number): Uint8Array {
  return Uint8Array.from(
    VarDeclaration.getConst().concat(
      Punctuation.getSpace(),
      Names.getName(name),
      Punctuation.getSpace(),
      Punctuation.getAssigne(),
      Punctuation.getSpace(),
      Function.getConstructorCall(GlobalName.getUint8Array()),
      Punctuation.getEndLine(),
    )
  );
}

