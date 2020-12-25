const __m__ = new Uint8Array(30000);
let p = 0;
__m__[p + 1] += 15;
// pure loop
if (__m__[p + 1]) {
    __m__[p + 0] += __m__[p + 1];
    __m__[p + 8] += 10 * __m__[p + 1];
    // set to zero loop
    __m__[p + 1] = 0;
}
__m__[p + 2] += 5;
// pure loop
if (__m__[p + 2]) {
    __m__[p + 1] += 9 * __m__[p + 2];
    // set to zero loop
    __m__[p + 2] = 0;
}
__m__[p + 2] += 1;
__m__[p + 8] += 1;
// search pure loop
while (__m__[p + 8]) {
    __m__[p + 6] += 3;
    // search pure loop
    while (__m__[p + 6]) {
        while (__m__[p + 8]) {
            __m__[p + 8] -= 1;
            p += -1;
        }
        while (__m__[p + 7]) {
            p += 1;
        }
        __m__[p + 6] -= 1;
    }
    while (__m__[p + 8]) {
        __m__[p + 9] += 1;
        p += 2;
    }
    while (__m__[p + 7]) {
        p -= 1;
    }
}
while (__m__[p + 9]) {
    // pure loop
    if (__m__[p + 9]) {
        __m__[p + 13] += __m__[p + 9];
        // set to zero loop
        __m__[p + 9] = 0;
    }
    __m__[p + 12] += 3;
    __m__[p + 13] -= 1;
    p += 4;
}
while (__m__[p + 8]) {
    p -= 4;
}
__m__[p + 0] += 1;
// search pure loop
while (__m__[p + 0]) {
    __m__[p + 0] -= 1;
    while (__m__[p + 12]) {
        __m__[p + 11] += 1;
        // pure loop
        if (__m__[p + 11]) {
            __m__[p + 15] += __m__[p + 11];
            // set to zero loop
            __m__[p + 11] = 0;
        }
        p += 4;
    }
    while (__m__[p + 8]) {
        // pure loop
        if (__m__[p + 13]) {
            __m__[p + 9] += __m__[p + 13];
            // set to zero loop
            __m__[p + 13] = 0;
        }
        __m__[p + 8] -= 1;
        // pure loop
        if (__m__[p + 8]) {
            __m__[p + 6] += 10 * __m__[p + 8];
            // set to zero loop
            __m__[p + 8] = 0;
        }
        // search pure loop
        while (__m__[p + 11]) {
            // pure loop
            if (__m__[p + 9]) {
                __m__[p + 8] += __m__[p + 9];
                __m__[p + 6] += __m__[p + 9];
                // set to zero loop
                __m__[p + 9] = 0;
            }
            // pure loop
            if (__m__[p + 8]) {
                __m__[p + 9] += __m__[p + 8];
                // set to zero loop
                __m__[p + 8] = 0;
            }
            __m__[p + 7] += 2;
            __m__[p + 5] += 1;
            __m__[p + 11] -= 1;
        }
        // set to zero loop
        __m__[p + 9] = 0;
        __m__[p + 7] -= 1;
        while (__m__[p + 6]) {
            __m__[p + 6] -= 1;
            __m__[p + 8] += 1;
            __m__[p + 7] -= 1;
            while (__m__[p + 7]) {
                p += 3;
            }
            while (__m__[p + 8]) {
                // pure loop
                if (__m__[p + 8]) {
                    __m__[p + 7] += __m__[p + 8];
                    // set to zero loop
                    __m__[p + 8] = 0;
                }
                __m__[p + 9] += 1;
                p += 3;
            }
            p += -3;
        }
        // set to zero loop
        __m__[p + 7] = 0;
        __m__[p + 8] += 1;
        __m__[p + 5] -= 1;
        // pure loop
        if (__m__[p + 5]) {
            __m__[p + 7] += __m__[p + 5];
            // set to zero loop
            __m__[p + 5] = 0;
        }
        p += -4;
    }
    __m__[p + 4] += 1;
    // set to zero loop
    __m__[p + 12] = 0;
    // pure loop
    if (__m__[p + 13]) {
        __m__[p + 10] += __m__[p + 13];
        // set to zero loop
        __m__[p + 13] = 0;
    }
    __m__[p + 11] += 10;
    while (__m__[p + 10]) {
        __m__[p + 10] -= 1;
        __m__[p + 12] += 1;
        __m__[p + 11] -= 1;
        while (__m__[p + 11]) {
            p += 3;
        }
        while (__m__[p + 12]) {
            // pure loop
            if (__m__[p + 12]) {
                __m__[p + 11] += __m__[p + 12];
                // set to zero loop
                __m__[p + 12] = 0;
            }
            __m__[p + 13] += 1;
            p += 3;
        }
        p += -3;
    }
    // set to zero loop
    __m__[p + 11] = 0;
    __m__[p + 12] += 1;
    // pure loop
    if (__m__[p + 13]) {
        __m__[p + 11] += __m__[p + 13];
        __m__[p + 10] += __m__[p + 13];
        // set to zero loop
        __m__[p + 13] = 0;
    }
    __m__[p + 9] += 1;
    __m__[p + 8] += 1;
    // search pure loop
    while (__m__[p + 10]) {
        __m__[p + 10] -= 1;
        // search pure loop
        while (__m__[p + 10]) {
            __m__[p + 10] -= 1;
            // search pure loop
            while (__m__[p + 10]) {
                __m__[p + 10] -= 1;
                // search pure loop
                while (__m__[p + 10]) {
                    __m__[p + 10] -= 1;
                    // search pure loop
                    while (__m__[p + 10]) {
                        __m__[p + 10] -= 1;
                        // search pure loop
                        while (__m__[p + 10]) {
                            __m__[p + 10] -= 1;
                            // search pure loop
                            while (__m__[p + 10]) {
                                __m__[p + 10] -= 1;
                                // search pure loop
                                while (__m__[p + 10]) {
                                    __m__[p + 10] -= 1;
                                    // search pure loop
                                    while (__m__[p + 10]) {
                                        __m__[p + 10] -= 1;
                                        __m__[p + 9] -= 1;
                                        // pure loop
                                        if (__m__[p + 10]) {
                                            __m__[p + 9] += __m__[p + 10];
                                            __m__[p + 8] -= __m__[p + 10];
                                            // set to zero loop
                                            __m__[p + 10] = 0;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    // search pure loop
    while (__m__[p + 9]) {
        __m__[p + 9] += 5;
        // pure loop
        if (__m__[p + 9]) {
            __m__[p + 6] += 8 * __m__[p + 9];
            __m__[p + 5] += 8 * __m__[p + 9];
            // set to zero loop
            __m__[p + 9] = 0;
        }
        __m__[p + 5] += 1;
        __m__[p + 4] -= 1;
        // pure loop
        if (__m__[p + 8]) {
            __m__[p + 9] += __m__[p + 8];
            __m__[p + 6] += 9 * __m__[p + 8];
            __m__[p + 5] -= __m__[p + 8];
            // set to zero loop
            __m__[p + 8] = 0;
        }
        // pure loop
        if (__m__[p + 3]) {
            __m__[p + 5] += __m__[p + 3];
            // set to zero loop
            __m__[p + 3] = 0;
        }
        __m__[p + 3] += 1;
        // pure loop
        if (__m__[p + 2]) {
            __m__[p + 3] -= __m__[p + 2];
            // set to zero loop
            __m__[p + 2] = 0;
        }
        // search pure loop
        while (__m__[p + 3]) {
            outF(__m__[p + 5]);
            // search pure loop
            while (__m__[p + 1]) {
                __m__[p + 1] += 1;
                outF(__m__[p + 1]);
                // set to zero loop
                __m__[p + 1] = 0;
            }
            __m__[p + 3] -= 1;
        }
        // search pure loop
        while (__m__[p + 4]) {
            outF(__m__[p + 6]);
            __m__[p + 4] -= 1;
        }
        // set to zero loop
        __m__[p + 5] = 0;
        // set to zero loop
        __m__[p + 6] = 0;
        // search pure loop
        while (__m__[p + 9]) {
            // pure loop
            if (__m__[p + 11]) {
                __m__[p + 3] += __m__[p + 11];
                // set to zero loop
                __m__[p + 11] = 0;
            }
            __m__[p + 9] -= 1;
        }
    }
    // set to zero loop
    __m__[p + 11] = 0;
    // set to zero loop
    __m__[p + 8] = 0;
}
__m__[p + 0] += 10;
outF(__m__[p + 0]);