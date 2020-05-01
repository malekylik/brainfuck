// const {name} = new Uint8Array({size});

const tx = new TextEncoder();

const Numbers = {
  // +
  add(): Array<number> {
    return [43];
  },
  // -
  subtract(): Array<number> {
    return [45];
  },

  getInt(int: number): Array<number> {
    return Array.from(tx.encode(String(int)));
  },
};

const Punctuation = {
  // '\n'
  getNewLine(): Array<number> {
    return [10];
  },

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
};



const VarDeclaration = {
  // let
  getLet(): Array<number> {
    return [108, 101, 116];
  },

  // const
  getConst(): Array<number> {
    return [99, 111, 110, 115, 116];
  },
};

const GlobalName = {
  // Uint8Array
  getUint8Array(): Array<number> {
    return [85, 105, 110, 116, 56, 65, 114, 114, 97, 121];
  },
};

const ReservedNames = {
  VarDeclaration,

  // new
  getNew(): Array<number> {
    return [110, 101, 119];
  },
};

const Names = {
  GlobalName,
  ReservedNames,

  // [
  getObjectPropertyOpenBracket(): Array<number> {
    return [91];
  },

  // ]
  getObjectPropertyCloseBracket(): Array<number> {
    return [93];
  },

  getName(name: string): Array<number> {
    return Array.from(tx.encode(name));
  }
};



const FunctionBin = {
  // {name}()
  getFunctionCall<T>(functionName: Array<number>, args: Array<T>): Array<number> {
    const encodedArgs = args.filter(v => v).map(v => Array.from(tx.encode(String(v))));

    return functionName.concat(
      Punctuation.getOpenBracket(),
      ...encodedArgs,
      Punctuation.getCloseBracket(),
    );
  },

  // new {name}()
  getConstructorCall<T>(functionName: Array<number>, args: Array<T>): Array<number> {
    return ReservedNames.getNew().concat(
      Punctuation.getSpace(),
      FunctionBin.getFunctionCall(functionName, args),
    );
  },
};

export const Bin = {
  Names,
  Punctuation,
  Numbers,
  FunctionBin,
};
