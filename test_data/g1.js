(module
    (import "env" "print"(func $print(param i32)))
(import "env" "memory"(memory 1))
(func $run(local $p i32)(local $p_offset i32)(local $p_cached i32)
local.get $p
i32.const 0
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 13
i32.add
i32.store8
local.get $p
i32.const 0
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 1
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 0
i32.add
i32.load8_u
i32.const 2
i32.mul
i32.add
i32.store8
local.get $p
i32.const 4
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 0
i32.add
i32.load8_u
i32.const 5
i32.mul
i32.add
i32.store8
local.get $p
i32.const 5
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 0
i32.add
i32.load8_u
i32.const 2
i32.mul
i32.add
i32.store8
local.get $p
i32.const 6
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 0
i32.add
i32.load8_u
i32.add
i32.store8
local.get $p
i32.const 0
i32.add
i32.const 0
i32.store8
end
local.get $p
i32.const 5
i32.add
local.set $p
local.get $p
i32.const 0
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 6
i32.add
i32.store8
local.get $p
i32.const 1
i32.add
local.set $p
local.get $p
i32.const 0
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 3
i32.sub
i32.store8
local.get $p
i32.const 10
i32.add
local.set $p
local.get $p
i32.const 0
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 15
i32.add
i32.store8
block
loop
local.get $p
i32.const 0
i32.add
i32.load8_u
i32.eqz
br_if 1
block
loop
local.get $p
i32.const 0
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 0
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const 0
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 9
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 0
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const 0
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 8
i32.add
i32.const 0
i32.store8
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 9
i32.sub
local.set $p
block
loop
local.get $p
i32.const 0
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 8
i32.add
local.set $p
local.get $p
i32.const 0
i32.add
i32.const 1
i32.store8
local.get $p
i32.const 7
i32.sub
local.set $p
local.get $p
i32.const 0
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 5
i32.add
i32.store8
block
loop
local.get $p
i32.const 0
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 0
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 0
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const 9
i32.add
local.get $p_offset
i32.const 9
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 7
i32.add
local.set $p
local.get $p
i32.const 0
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 27
i32.add
local.set $p
local.get $p
i32.const 0
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 17
i32.sub
local.set $p
block
loop
local.get $p
i32.const 0
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 3
i32.add
local.set $p
local.get $p
i32.const 0
i32.add
i32.const 1
i32.store8
block
loop
local.get $p
i32.const 0
i32.add
i32.load8_u
i32.eqz
br_if 1
block
loop
local.get $p
i32.const 6
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 13
i32.add
i32.const 0
i32.store8
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const - 3
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 4
i32.add
i32.const 1
i32.store8
local.get $p
i32.const - 2
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 4
i32.add
i32.store8
block
loop
local.get $p
i32.const - 2
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 2
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const - 2
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const 9
i32.add
local.get $p_offset
i32.const 9
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 4
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const - 2
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 7
i32.add
i32.store8
block
loop
local.get $p
i32.const - 2
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 2
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const - 2
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const 9
i32.add
local.get $p_offset
i32.const 9
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 4
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const - 12
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const - 9
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
i32.const 0
i32.store8
block
loop
local.get $p
i32.const - 3
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 4
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const - 6
i32.add
local.get $p_offset
i32.const - 6
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const - 2
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 4
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const - 2
i32.add
i32.load8_u
i32.add
i32.store8
local.get $p
i32.const 2
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const - 2
i32.add
i32.load8_u
i32.add
i32.store8
local.get $p
i32.const - 1
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const - 2
i32.add
i32.load8_u
i32.add
i32.store8
local.get $p
i32.const - 2
i32.add
i32.const 0
i32.store8
end
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const - 12
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const - 3
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 5
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const - 7
i32.add
local.get $p_offset
i32.const - 7
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const - 2
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 5
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const - 2
i32.add
i32.load8_u
i32.add
i32.store8
local.get $p
i32.const 3
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const - 2
i32.add
i32.load8_u
i32.add
i32.store8
local.get $p
i32.const 0
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const - 2
i32.add
i32.load8_u
i32.add
i32.store8
local.get $p
i32.const - 2
i32.add
i32.const 0
i32.store8
end
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const - 12
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const - 5
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const - 7
i32.add
local.get $p_offset
i32.const - 7
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const - 12
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const - 5
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const - 12
i32.add
i32.load8_u
i32.add
i32.store8
local.get $p
i32.const - 7
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const - 12
i32.add
i32.load8_u
i32.add
i32.store8
local.get $p
i32.const - 12
i32.add
i32.const 0
i32.store8
end
local.get $p
i32.const - 3
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 15
i32.add
i32.store8
block
loop
local.get $p
i32.const - 3
i32.add
i32.load8_u
i32.eqz
br_if 1
block
loop
local.get $p
i32.const - 3
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const - 3
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const - 3
i32.add
local.set $p_offset
local.get $p_offset
i32.const 1
i32.add
local.tee $p_offset
i32.const 0
i32.store8
local.get $p_offset
i32.const 2
i32.add
local.tee $p_offset
i32.const 0
i32.store8
local.get $p_offset
i32.const 3
i32.add
local.tee $p_offset
i32.const 0
i32.store8
local.get $p_offset
i32.const 4
i32.add
local.tee $p_offset
i32.const 0
i32.store8
local.get $p_offset
i32.const 5
i32.add
local.tee $p_offset
i32.const 0
i32.store8
local.get $p_offset
i32.const 6
i32.add
local.tee $p_offset
i32.const 0
i32.store8
local.get $p_offset
i32.const 7
i32.add
local.tee $p_offset
i32.const 0
i32.store8
local.get $p_offset
i32.const 8
i32.add
local.tee $p_offset
i32.const 0
i32.store8
local.get $p_offset
i32.const 9
i32.add
local.tee $p_offset
i32.const 0
i32.store8
block
loop
local.get $p
i32.const - 3
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 6
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const - 3
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const - 3
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 2
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const - 12
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const - 3
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 2
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 2
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const - 4
i32.add
local.get $p_offset
i32.const - 4
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
block
loop
local.get $p
i32.const - 2
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 2
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 2
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const - 3
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 3
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const - 1
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const - 2
i32.add
local.get $p_offset
i32.const - 2
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const - 3
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const - 1
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const - 3
i32.add
i32.load8_u
i32.add
i32.store8
local.get $p
i32.const 1
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const - 3
i32.add
i32.load8_u
i32.add
i32.store8
local.get $p
i32.const - 3
i32.add
i32.const 0
i32.store8
end
local.get $p
i32.const - 3
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const - 11
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 9
i32.sub
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 7
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const - 2
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 1
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const 9
i32.add
local.get $p_offset
i32.const 9
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 9
i32.sub
local.set $p
br 0
end
end
local.get $p
i32.const - 1
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const 9
i32.add
local.get $p_offset
i32.const 9
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const - 2
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const - 12
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 11
i32.add
i32.const 0
i32.store8
local.get $p
i32.const - 12
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
block
loop
local.get $p
i32.const - 8
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 8
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const - 12
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const - 11
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 12
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const - 11
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const - 17
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
br 0
end
end
local.get $p
i32.const - 12
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const 1
i32.add
local.get $p_offset
i32.const 1
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
br 0
end
end
local.get $p
i32.const - 11
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const 3
i32.add
local.get $p_offset
i32.const 3
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const - 12
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 9
i32.sub
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const - 3
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 2
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const - 12
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const - 3
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 2
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 3
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const - 5
i32.add
local.get $p_offset
i32.const - 5
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
block
loop
local.get $p
i32.const - 2
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 2
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 3
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const - 3
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 3
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 0
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const - 3
i32.add
local.get $p_offset
i32.const - 3
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const - 3
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 0
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const - 3
i32.add
i32.load8_u
i32.add
i32.store8
local.get $p
i32.const 1
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const - 3
i32.add
i32.load8_u
i32.add
i32.store8
local.get $p
i32.const - 3
i32.add
i32.const 0
i32.store8
end
local.get $p
i32.const - 3
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const - 11
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 9
i32.sub
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 7
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const - 2
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 0
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const 9
i32.add
local.get $p_offset
i32.const 9
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 9
i32.sub
local.set $p
br 0
end
end
local.get $p
i32.const 0
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const 9
i32.add
local.get $p_offset
i32.const 9
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const - 2
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const - 12
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 11
i32.add
i32.const 0
i32.store8
local.get $p
i32.const - 12
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
block
loop
local.get $p
i32.const - 8
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 8
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const - 12
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const - 11
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 12
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const - 11
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const - 17
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
br 0
end
end
local.get $p
i32.const - 12
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const 1
i32.add
local.get $p_offset
i32.const 1
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
br 0
end
end
local.get $p
i32.const - 11
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const 3
i32.add
local.get $p_offset
i32.const 3
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const - 12
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 9
i32.sub
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const - 3
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 1
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const - 36
i32.add
local.get $p_offset
i32.const - 36
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const - 12
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const - 3
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 15
i32.add
i32.store8
block
loop
local.get $p
i32.const - 3
i32.add
i32.load8_u
i32.eqz
br_if 1
block
loop
local.get $p
i32.const - 3
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const - 12
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
block
loop
local.get $p
i32.const - 21
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const - 12
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 9
i32.sub
local.set $p
br 0
end
end
local.get $p
i32.const - 3
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 18
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const 15
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 24
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 27
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 24
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 27
i32.add
i32.load8_u
i32.sub
i32.store8
local.get $p
i32.const 27
i32.add
i32.const 0
i32.store8
end
local.get $p
i32.const 27
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const 24
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 24
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 27
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 28
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const - 4
i32.add
local.get $p_offset
i32.const - 4
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
block
loop
local.get $p
i32.const 24
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 24
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 28
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
local.set $p_cached
block
loop
local.get $p
i32.const 15
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 19
i32.add
i32.const 1
i32.store8
local.get $p_cached
local.set $p
block
loop
local.get $p
i32.const 24
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 25
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
br 0
end
end
br 0
end
end
local.get $p
i32.const 24
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 28
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 24
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 28
i32.add
i32.load8_u
i32.sub
i32.store8
local.get $p
i32.const 28
i32.add
i32.const 0
i32.store8
end
local.get $p
i32.const 28
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const 24
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 24
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 28
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 27
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const - 3
i32.add
local.get $p_offset
i32.const - 3
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
block
loop
local.get $p
i32.const 24
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 24
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 27
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
local.set $p_cached
block
loop
local.get $p
i32.const 15
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 18
i32.add
i32.const 1
i32.store8
local.get $p_cached
local.set $p
block
loop
local.get $p
i32.const 24
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 25
i32.add
i32.const 1
i32.store8
br 0
end
end
br 0
end
end
local.get $p
i32.const 24
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const 25
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 25
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
block
loop
local.get $p
i32.const 24
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 9
i32.sub
local.set $p
br 0
end
end
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 15
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 8
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 9
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 8
i32.add
i32.load8_u
i32.add
i32.store8
local.get $p
i32.const 12
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 8
i32.add
i32.load8_u
i32.sub
i32.store8
local.get $p
i32.const 8
i32.add
i32.const 0
i32.store8
end
local.get $p
i32.const 17
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 26
i32.add
i32.store8
local.get $p
i32.const 19
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const - 4
i32.add
local.get $p_offset
i32.const - 4
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 15
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 19
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 15
i32.add
i32.load8_u
i32.add
i32.store8
local.get $p
i32.const 17
i32.add
i32.const 0
i32.store8
local.get $p
i32.const 15
i32.add
i32.const 0
i32.store8
end
block
loop
local.get $p
i32.const 17
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 10
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const 9
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 9
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 8
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 12
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 10
i32.add
i32.const 0
i32.store8
local.get $p
i32.const 1
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 10
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 10
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 8
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 9
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 8
i32.add
i32.load8_u
i32.add
i32.store8
local.get $p
i32.const 12
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 8
i32.add
i32.load8_u
i32.sub
i32.store8
local.get $p
i32.const 8
i32.add
i32.const 0
i32.store8
end
local.get $p
i32.const 1
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 23
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 25
i32.add
i32.const 0
i32.store8
local.get $p
i32.const 26
i32.add
i32.const 0
i32.store8
local.get $p
i32.const 27
i32.add
i32.const 0
i32.store8
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 14
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 17
i32.add
i32.const 0
i32.store8
block
loop
local.get $p
i32.const 23
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 28
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const - 4
i32.add
local.get $p_offset
i32.const - 4
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 24
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 28
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 24
i32.add
i32.load8_u
i32.add
i32.store8
local.get $p
i32.const 25
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 24
i32.add
i32.load8_u
i32.add
i32.store8
local.get $p
i32.const 24
i32.add
i32.const 0
i32.store8
end
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 14
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 23
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 25
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const - 9
i32.add
local.get $p_offset
i32.const - 9
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 14
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 23
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 15
i32.add
i32.store8
block
loop
local.get $p
i32.const 23
i32.add
i32.load8_u
i32.eqz
br_if 1
block
loop
local.get $p
i32.const 23
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 23
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 23
i32.add
local.set $p_offset
local.get $p_offset
i32.const 1
i32.add
local.tee $p_offset
i32.const 0
i32.store8
local.get $p_offset
i32.const 2
i32.add
local.tee $p_offset
i32.const 0
i32.store8
local.get $p_offset
i32.const 3
i32.add
local.tee $p_offset
i32.const 0
i32.store8
local.get $p_offset
i32.const 4
i32.add
local.tee $p_offset
i32.const 0
i32.store8
local.get $p_offset
i32.const 5
i32.add
local.tee $p_offset
i32.const 0
i32.store8
local.get $p_offset
i32.const 6
i32.add
local.tee $p_offset
i32.const 0
i32.store8
local.get $p_offset
i32.const 7
i32.add
local.tee $p_offset
i32.const 0
i32.store8
local.get $p_offset
i32.const 8
i32.add
local.tee $p_offset
i32.const 0
i32.store8
local.get $p_offset
i32.const 9
i32.add
local.tee $p_offset
i32.const 0
i32.store8
block
loop
local.get $p
i32.const 23
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 32
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 23
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const 23
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 24
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 14
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 23
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 24
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 29
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const - 5
i32.add
local.get $p_offset
i32.const - 5
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
block
loop
local.get $p
i32.const 24
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 24
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 29
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const 23
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 23
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 25
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const - 2
i32.add
local.get $p_offset
i32.const - 2
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 23
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 25
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 23
i32.add
i32.load8_u
i32.add
i32.store8
local.get $p
i32.const 26
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 23
i32.add
i32.load8_u
i32.add
i32.store8
local.get $p
i32.const 23
i32.add
i32.const 0
i32.store8
end
local.get $p
i32.const 23
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 15
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 9
i32.sub
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 33
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 24
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 25
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const 9
i32.add
local.get $p_offset
i32.const 9
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 9
i32.sub
local.set $p
br 0
end
end
local.get $p
i32.const 25
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const 9
i32.add
local.get $p_offset
i32.const 9
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 24
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 14
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 15
i32.add
i32.const 0
i32.store8
local.get $p
i32.const 14
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
block
loop
local.get $p
i32.const 17
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 17
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 14
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const 15
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 14
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 15
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 8
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
br 0
end
end
local.get $p
i32.const 14
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const 1
i32.add
local.get $p_offset
i32.const 1
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
br 0
end
end
local.get $p
i32.const 15
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const 2
i32.add
local.get $p_offset
i32.const 2
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 14
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 9
i32.sub
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 23
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 29
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const - 5
i32.add
local.get $p_offset
i32.const - 5
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 24
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 29
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 24
i32.add
i32.load8_u
i32.add
i32.store8
local.get $p
i32.const 25
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 24
i32.add
i32.load8_u
i32.add
i32.store8
local.get $p
i32.const 24
i32.add
i32.const 0
i32.store8
end
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 14
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 23
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 24
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 14
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 23
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 24
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 29
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const - 5
i32.add
local.get $p_offset
i32.const - 5
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
block
loop
local.get $p
i32.const 24
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 24
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 29
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const 23
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 23
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 25
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const - 2
i32.add
local.get $p_offset
i32.const - 2
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 23
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 25
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 23
i32.add
i32.load8_u
i32.add
i32.store8
local.get $p
i32.const 27
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 23
i32.add
i32.load8_u
i32.add
i32.store8
local.get $p
i32.const 23
i32.add
i32.const 0
i32.store8
end
local.get $p
i32.const 23
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 15
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 9
i32.sub
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 33
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 24
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 25
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const 9
i32.add
local.get $p_offset
i32.const 9
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 9
i32.sub
local.set $p
br 0
end
end
local.get $p
i32.const 25
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const 9
i32.add
local.get $p_offset
i32.const 9
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 24
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 14
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 15
i32.add
i32.const 0
i32.store8
local.get $p
i32.const 14
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
block
loop
local.get $p
i32.const 18
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 18
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 14
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const 15
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 14
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 15
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 9
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
br 0
end
end
local.get $p
i32.const 14
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const 1
i32.add
local.get $p_offset
i32.const 1
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
br 0
end
end
local.get $p
i32.const 15
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const 3
i32.add
local.get $p_offset
i32.const 3
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 14
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 9
i32.sub
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 23
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 27
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const - 36
i32.add
local.get $p_offset
i32.const - 36
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 14
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 23
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 26
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const - 36
i32.add
local.get $p_offset
i32.const - 36
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 14
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 23
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 15
i32.add
i32.store8
block
loop
local.get $p
i32.const 23
i32.add
i32.load8_u
i32.eqz
br_if 1
block
loop
local.get $p
i32.const 23
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 14
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
block
loop
local.get $p
i32.const 5
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 14
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 9
i32.sub
local.set $p
br 0
end
end
local.get $p
i32.const 23
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const 23
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 31
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const - 7
i32.add
local.get $p_offset
i32.const - 7
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 24
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 31
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 24
i32.add
i32.load8_u
i32.add
i32.store8
local.get $p
i32.const 25
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 24
i32.add
i32.load8_u
i32.add
i32.store8
local.get $p
i32.const 24
i32.add
i32.const 0
i32.store8
end
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 14
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 23
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 29
i32.add
i32.const 0
i32.store8
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 14
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 18
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 19
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 18
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 19
i32.add
i32.load8_u
i32.sub
i32.store8
local.get $p
i32.const 14
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 19
i32.add
i32.load8_u
i32.add
i32.store8
local.get $p
i32.const 19
i32.add
i32.const 0
i32.store8
end
block
loop
local.get $p
i32.const 20
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 20
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 14
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 19
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 14
i32.add
i32.load8_u
i32.add
i32.store8
local.get $p
i32.const 18
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 14
i32.add
i32.load8_u
i32.const 2
i32.mul
i32.add
i32.store8
local.get $p
i32.const 14
i32.add
i32.const 0
i32.store8
end
local.get $p
i32.const 19
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const - 5
i32.add
local.get $p_offset
i32.const - 5
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 18
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 19
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
br 0
end
end
local.get $p
i32.const 19
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const 1
i32.add
local.get $p_offset
i32.const 1
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 14
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const 5
i32.add
local.get $p_offset
i32.const 5
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 20
i32.add
i32.const 0
i32.store8
local.get $p
i32.const 14
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 18
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 14
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 18
i32.add
i32.load8_u
i32.sub
i32.store8
local.get $p
i32.const 18
i32.add
i32.const 0
i32.store8
end
local.get $p
i32.const 18
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const 14
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 14
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 18
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
block
loop
local.get $p
i32.const 23
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 25
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 23
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 25
i32.add
i32.load8_u
i32.sub
i32.store8
local.get $p
i32.const 25
i32.add
i32.const 0
i32.store8
end
local.get $p
i32.const 25
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const 23
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 23
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 25
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 26
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const - 3
i32.add
local.get $p_offset
i32.const - 3
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
block
loop
local.get $p
i32.const 23
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 23
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 26
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
local.set $p_cached
block
loop
local.get $p
i32.const 14
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 17
i32.add
i32.const 1
i32.store8
local.get $p_cached
local.set $p
block
loop
local.get $p
i32.const 23
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 24
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
br 0
end
end
br 0
end
end
local.get $p
i32.const 23
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 26
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 23
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 26
i32.add
i32.load8_u
i32.sub
i32.store8
local.get $p
i32.const 26
i32.add
i32.const 0
i32.store8
end
local.get $p
i32.const 26
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const 23
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 23
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 26
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 25
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const - 2
i32.add
local.get $p_offset
i32.const - 2
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
block
loop
local.get $p
i32.const 23
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 23
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 25
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
local.set $p_cached
block
loop
local.get $p
i32.const 14
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 18
i32.add
i32.const 1
i32.store8
local.get $p_cached
local.set $p
block
loop
local.get $p
i32.const 23
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 24
i32.add
i32.const 1
i32.store8
br 0
end
end
br 0
end
end
local.get $p
i32.const 23
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const 24
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 24
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
block
loop
local.get $p
i32.const 23
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 9
i32.sub
local.set $p
br 0
end
end
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 14
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 18
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const - 4
i32.add
local.get $p_offset
i32.const - 4
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
block
loop
local.get $p
i32.const 14
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 14
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 18
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const 23
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 24
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 26
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 24
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 26
i32.add
i32.load8_u
i32.sub
i32.store8
local.get $p
i32.const 26
i32.add
i32.const 0
i32.store8
end
local.get $p
i32.const 24
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const 2
i32.add
local.get $p_offset
i32.const 2
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 15
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const 14
i32.add
i32.load8_u
i32.eqz
br_if 1
block
loop
local.get $p
i32.const 15
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 15
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 20
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const 16
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 16
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 20
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 6
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 17
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const 3
i32.add
local.get $p_offset
i32.const 3
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
br 0
end
end
local.get $p
i32.const 17
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 20
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 17
i32.add
i32.load8_u
i32.sub
i32.store8
local.get $p
i32.const 6
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 17
i32.add
i32.load8_u
i32.add
i32.store8
local.get $p
i32.const 17
i32.add
i32.const 0
i32.store8
end
br 0
end
end
local.get $p
i32.const 16
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 20
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 16
i32.add
i32.load8_u
i32.add
i32.store8
local.get $p
i32.const 17
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 20
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 17
i32.add
i32.load8_u
i32.sub
i32.store8
local.get $p
i32.const 6
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 17
i32.add
i32.load8_u
i32.add
i32.store8
local.get $p
i32.const 17
i32.add
i32.const 0
i32.store8
end
local.get $p
i32.const 16
i32.add
i32.const 0
i32.store8
end
local.get $p
i32.const 17
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const 3
i32.add
local.get $p_offset
i32.const 3
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 9
i32.sub
local.set $p
br 0
end
end
local.get $p
i32.const 18
i32.add
i32.const 0
i32.store8
br 0
end
end
local.get $p
i32.const 17
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const - 3
i32.add
local.get $p_offset
i32.const - 3
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
block
loop
local.get $p
i32.const 14
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 14
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 17
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const 23
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 24
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 25
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 24
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 25
i32.add
i32.load8_u
i32.sub
i32.store8
local.get $p
i32.const 25
i32.add
i32.const 0
i32.store8
end
local.get $p
i32.const 24
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const 1
i32.add
local.get $p_offset
i32.const 1
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 15
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const 14
i32.add
i32.load8_u
i32.eqz
br_if 1
block
loop
local.get $p
i32.const 15
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 15
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 20
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const 17
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 17
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 20
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 6
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 16
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const 4
i32.add
local.get $p_offset
i32.const 4
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
br 0
end
end
local.get $p
i32.const 16
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 20
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 16
i32.add
i32.load8_u
i32.sub
i32.store8
local.get $p
i32.const 6
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 16
i32.add
i32.load8_u
i32.add
i32.store8
local.get $p
i32.const 16
i32.add
i32.const 0
i32.store8
end
br 0
end
end
local.get $p
i32.const 17
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 20
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 17
i32.add
i32.load8_u
i32.add
i32.store8
local.get $p
i32.const 16
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 20
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 16
i32.add
i32.load8_u
i32.sub
i32.store8
local.get $p
i32.const 6
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 16
i32.add
i32.load8_u
i32.add
i32.store8
local.get $p
i32.const 16
i32.add
i32.const 0
i32.store8
end
local.get $p
i32.const 17
i32.add
i32.const 0
i32.store8
end
local.get $p
i32.const 16
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const 4
i32.add
local.get $p_offset
i32.const 4
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 9
i32.sub
local.set $p
br 0
end
end
local.get $p
i32.const 20
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
br 0
end
end
br 0
end
end
local.get $p
i32.const 18
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const - 4
i32.add
local.get $p_offset
i32.const - 4
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
block
loop
local.get $p
i32.const 14
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 14
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 18
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const 23
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 14
i32.add
i32.load8_u
i32.eqz
br_if 1
block
loop
local.get $p
i32.const 15
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 15
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 20
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const 16
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 16
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 20
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 6
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 17
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const 3
i32.add
local.get $p_offset
i32.const 3
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
br 0
end
end
local.get $p
i32.const 17
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 20
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 17
i32.add
i32.load8_u
i32.sub
i32.store8
local.get $p
i32.const 6
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 17
i32.add
i32.load8_u
i32.add
i32.store8
local.get $p
i32.const 17
i32.add
i32.const 0
i32.store8
end
br 0
end
end
local.get $p
i32.const 16
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 20
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 16
i32.add
i32.load8_u
i32.add
i32.store8
local.get $p
i32.const 17
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 20
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 17
i32.add
i32.load8_u
i32.sub
i32.store8
local.get $p
i32.const 6
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 17
i32.add
i32.load8_u
i32.add
i32.store8
local.get $p
i32.const 17
i32.add
i32.const 0
i32.store8
end
local.get $p
i32.const 16
i32.add
i32.const 0
i32.store8
end
local.get $p
i32.const 17
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const 3
i32.add
local.get $p_offset
i32.const 3
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 9
i32.sub
local.set $p
br 0
end
end
br 0
end
end
local.get $p
i32.const 15
i32.add
i32.const 0
i32.store8
local.get $p
i32.const 17
i32.add
i32.const 0
i32.store8
local.get $p
i32.const 18
i32.add
i32.const 0
i32.store8
block
loop
local.get $p
i32.const 23
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 25
i32.add
i32.const 0
i32.store8
local.get $p
i32.const 26
i32.add
i32.const 0
i32.store8
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 14
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 23
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 28
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const - 4
i32.add
local.get $p_offset
i32.const - 4
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 24
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 28
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 24
i32.add
i32.load8_u
i32.add
i32.store8
local.get $p
i32.const 25
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 24
i32.add
i32.load8_u
i32.add
i32.store8
local.get $p
i32.const 24
i32.add
i32.const 0
i32.store8
end
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 14
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 23
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 15
i32.add
i32.store8
block
loop
local.get $p
i32.const 23
i32.add
i32.load8_u
i32.eqz
br_if 1
block
loop
local.get $p
i32.const 23
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 23
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 23
i32.add
local.set $p_offset
local.get $p_offset
i32.const 1
i32.add
local.tee $p_offset
i32.const 0
i32.store8
local.get $p_offset
i32.const 2
i32.add
local.tee $p_offset
i32.const 0
i32.store8
local.get $p_offset
i32.const 3
i32.add
local.tee $p_offset
i32.const 0
i32.store8
local.get $p_offset
i32.const 4
i32.add
local.tee $p_offset
i32.const 0
i32.store8
local.get $p_offset
i32.const 5
i32.add
local.tee $p_offset
i32.const 0
i32.store8
local.get $p_offset
i32.const 6
i32.add
local.tee $p_offset
i32.const 0
i32.store8
local.get $p_offset
i32.const 7
i32.add
local.tee $p_offset
i32.const 0
i32.store8
local.get $p_offset
i32.const 8
i32.add
local.tee $p_offset
i32.const 0
i32.store8
local.get $p_offset
i32.const 9
i32.add
local.tee $p_offset
i32.const 0
i32.store8
block
loop
local.get $p
i32.const 23
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 32
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 23
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const 23
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 24
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 14
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 23
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 24
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 28
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const - 4
i32.add
local.get $p_offset
i32.const - 4
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
block
loop
local.get $p
i32.const 24
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 24
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 28
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const 23
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 23
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 25
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const - 2
i32.add
local.get $p_offset
i32.const - 2
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 23
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 25
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 23
i32.add
i32.load8_u
i32.add
i32.store8
local.get $p
i32.const 26
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 23
i32.add
i32.load8_u
i32.add
i32.store8
local.get $p
i32.const 23
i32.add
i32.const 0
i32.store8
end
local.get $p
i32.const 23
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 15
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 9
i32.sub
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 33
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 24
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 25
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const 9
i32.add
local.get $p_offset
i32.const 9
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 9
i32.sub
local.set $p
br 0
end
end
local.get $p
i32.const 25
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const 9
i32.add
local.get $p_offset
i32.const 9
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 24
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 14
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 15
i32.add
i32.const 0
i32.store8
local.get $p
i32.const 14
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
block
loop
local.get $p
i32.const 17
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 17
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 14
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const 15
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 14
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 15
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 8
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
br 0
end
end
local.get $p
i32.const 14
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const 1
i32.add
local.get $p_offset
i32.const 1
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
br 0
end
end
local.get $p
i32.const 15
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const 2
i32.add
local.get $p_offset
i32.const 2
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 14
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 9
i32.sub
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 23
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 26
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const - 36
i32.add
local.get $p_offset
i32.const - 36
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 14
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 19
i32.add
i32.const 0
i32.store8
local.get $p
i32.const 23
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 15
i32.add
i32.store8
block
loop
local.get $p
i32.const 23
i32.add
i32.load8_u
i32.eqz
br_if 1
block
loop
local.get $p
i32.const 23
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 14
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
block
loop
local.get $p
i32.const 5
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 14
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 9
i32.sub
local.set $p
br 0
end
end
local.get $p
i32.const 23
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const 23
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 26
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 23
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 26
i32.add
i32.load8_u
i32.sub
i32.store8
local.get $p
i32.const 26
i32.add
i32.const 0
i32.store8
end
local.get $p
i32.const 26
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const 23
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 23
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 26
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 27
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const - 4
i32.add
local.get $p_offset
i32.const - 4
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
block
loop
local.get $p
i32.const 23
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 23
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 27
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
local.set $p_cached
block
loop
local.get $p
i32.const 14
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 18
i32.add
i32.const 1
i32.store8
local.get $p_cached
local.set $p
block
loop
local.get $p
i32.const 23
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 24
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
br 0
end
end
br 0
end
end
local.get $p
i32.const 23
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 27
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 23
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 27
i32.add
i32.load8_u
i32.sub
i32.store8
local.get $p
i32.const 27
i32.add
i32.const 0
i32.store8
end
local.get $p
i32.const 27
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const 23
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 23
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 27
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 26
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const - 3
i32.add
local.get $p_offset
i32.const - 3
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
block
loop
local.get $p
i32.const 23
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 23
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 26
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
local.set $p_cached
block
loop
local.get $p
i32.const 14
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 17
i32.add
i32.const 1
i32.store8
local.get $p_cached
local.set $p
block
loop
local.get $p
i32.const 23
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 24
i32.add
i32.const 1
i32.store8
br 0
end
end
br 0
end
end
local.get $p
i32.const 23
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const 24
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 24
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
block
loop
local.get $p
i32.const 23
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 9
i32.sub
local.set $p
br 0
end
end
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 14
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 17
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const - 3
i32.add
local.get $p_offset
i32.const - 3
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
block
loop
local.get $p
i32.const 14
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 14
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 17
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const 23
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 24
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 27
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 24
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 27
i32.add
i32.load8_u
i32.sub
i32.store8
local.get $p
i32.const 27
i32.add
i32.const 0
i32.store8
end
local.get $p
i32.const 24
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const 3
i32.add
local.get $p_offset
i32.const 3
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 15
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const 14
i32.add
i32.load8_u
i32.eqz
br_if 1
block
loop
local.get $p
i32.const 15
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 15
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 16
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const 17
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 17
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 16
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 6
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 18
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const - 2
i32.add
local.get $p_offset
i32.const - 2
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
br 0
end
end
local.get $p
i32.const 18
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 16
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 18
i32.add
i32.load8_u
i32.sub
i32.store8
local.get $p
i32.const 6
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 18
i32.add
i32.load8_u
i32.add
i32.store8
local.get $p
i32.const 18
i32.add
i32.const 0
i32.store8
end
br 0
end
end
local.get $p
i32.const 17
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 16
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 17
i32.add
i32.load8_u
i32.add
i32.store8
local.get $p
i32.const 18
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 16
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 18
i32.add
i32.load8_u
i32.sub
i32.store8
local.get $p
i32.const 6
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 18
i32.add
i32.load8_u
i32.add
i32.store8
local.get $p
i32.const 18
i32.add
i32.const 0
i32.store8
end
local.get $p
i32.const 17
i32.add
i32.const 0
i32.store8
end
local.get $p
i32.const 18
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const - 2
i32.add
local.get $p_offset
i32.const - 2
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 9
i32.sub
local.set $p
br 0
end
end
br 0
end
end
local.get $p
i32.const 18
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const - 4
i32.add
local.get $p_offset
i32.const - 4
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
block
loop
local.get $p
i32.const 14
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 14
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 18
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const 23
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 24
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 26
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 24
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 26
i32.add
i32.load8_u
i32.sub
i32.store8
local.get $p
i32.const 26
i32.add
i32.const 0
i32.store8
end
local.get $p
i32.const 24
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const 2
i32.add
local.get $p_offset
i32.const 2
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 15
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const 14
i32.add
i32.load8_u
i32.eqz
br_if 1
block
loop
local.get $p
i32.const 15
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 15
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 16
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const 18
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 18
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 16
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 6
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 17
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const - 1
i32.add
local.get $p_offset
i32.const - 1
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
br 0
end
end
local.get $p
i32.const 17
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 16
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 17
i32.add
i32.load8_u
i32.sub
i32.store8
local.get $p
i32.const 6
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 17
i32.add
i32.load8_u
i32.add
i32.store8
local.get $p
i32.const 17
i32.add
i32.const 0
i32.store8
end
br 0
end
end
local.get $p
i32.const 18
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 16
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 18
i32.add
i32.load8_u
i32.add
i32.store8
local.get $p
i32.const 17
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 16
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 17
i32.add
i32.load8_u
i32.sub
i32.store8
local.get $p
i32.const 6
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 17
i32.add
i32.load8_u
i32.add
i32.store8
local.get $p
i32.const 17
i32.add
i32.const 0
i32.store8
end
local.get $p
i32.const 18
i32.add
i32.const 0
i32.store8
end
local.get $p
i32.const 17
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const - 1
i32.add
local.get $p_offset
i32.const - 1
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 9
i32.sub
local.set $p
br 0
end
end
local.get $p
i32.const 19
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
br 0
end
end
block
loop
local.get $p
i32.const 23
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 26
i32.add
i32.const 0
i32.store8
local.get $p
i32.const 27
i32.add
i32.const 0
i32.store8
local.get $p
i32.const 28
i32.add
i32.const 0
i32.store8
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 14
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 17
i32.add
i32.const 0
i32.store8
local.get $p
i32.const 18
i32.add
i32.const 0
i32.store8
block
loop
local.get $p
i32.const 23
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 30
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const - 6
i32.add
local.get $p_offset
i32.const - 6
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 24
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 30
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 24
i32.add
i32.load8_u
i32.add
i32.store8
local.get $p
i32.const 26
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 24
i32.add
i32.load8_u
i32.add
i32.store8
local.get $p
i32.const 24
i32.add
i32.const 0
i32.store8
end
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 14
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 18
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 19
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 18
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 19
i32.add
i32.load8_u
i32.sub
i32.store8
local.get $p
i32.const 14
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 19
i32.add
i32.load8_u
i32.add
i32.store8
local.get $p
i32.const 19
i32.add
i32.const 0
i32.store8
end
block
loop
local.get $p
i32.const 21
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 21
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 14
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 19
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 14
i32.add
i32.load8_u
i32.add
i32.store8
local.get $p
i32.const 18
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 14
i32.add
i32.load8_u
i32.const 2
i32.mul
i32.add
i32.store8
local.get $p
i32.const 14
i32.add
i32.const 0
i32.store8
end
local.get $p
i32.const 19
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const - 5
i32.add
local.get $p_offset
i32.const - 5
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 18
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 19
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
br 0
end
end
local.get $p
i32.const 19
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const 2
i32.add
local.get $p_offset
i32.const 2
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 14
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const 5
i32.add
local.get $p_offset
i32.const 5
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 14
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 18
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 14
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 18
i32.add
i32.load8_u
i32.sub
i32.store8
local.get $p
i32.const 18
i32.add
i32.const 0
i32.store8
end
local.get $p
i32.const 18
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const 14
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 14
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 18
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
block
loop
local.get $p
i32.const 23
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 26
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 23
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 26
i32.add
i32.load8_u
i32.sub
i32.store8
local.get $p
i32.const 26
i32.add
i32.const 0
i32.store8
end
local.get $p
i32.const 26
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const 23
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 23
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 26
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 25
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const - 2
i32.add
local.get $p_offset
i32.const - 2
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
block
loop
local.get $p
i32.const 23
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 23
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 25
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
local.set $p_cached
block
loop
local.get $p
i32.const 14
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 18
i32.add
i32.const 1
i32.store8
local.get $p_cached
local.set $p
block
loop
local.get $p
i32.const 23
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 24
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
br 0
end
end
br 0
end
end
local.get $p
i32.const 23
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 25
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 23
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 25
i32.add
i32.load8_u
i32.sub
i32.store8
local.get $p
i32.const 25
i32.add
i32.const 0
i32.store8
end
local.get $p
i32.const 25
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const 23
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 23
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 25
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 26
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const - 3
i32.add
local.get $p_offset
i32.const - 3
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
block
loop
local.get $p
i32.const 23
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 23
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 26
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
local.set $p_cached
block
loop
local.get $p
i32.const 14
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 17
i32.add
i32.const 1
i32.store8
local.get $p_cached
local.set $p
block
loop
local.get $p
i32.const 23
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 24
i32.add
i32.const 1
i32.store8
br 0
end
end
br 0
end
end
local.get $p
i32.const 23
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const 24
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 24
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
block
loop
local.get $p
i32.const 23
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 9
i32.sub
local.set $p
br 0
end
end
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 14
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 17
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const - 3
i32.add
local.get $p_offset
i32.const - 3
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
block
loop
local.get $p
i32.const 14
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 14
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 17
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const 23
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 24
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 25
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 24
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 25
i32.add
i32.load8_u
i32.sub
i32.store8
local.get $p
i32.const 25
i32.add
i32.const 0
i32.store8
end
local.get $p
i32.const 24
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const 1
i32.add
local.get $p_offset
i32.const 1
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 15
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const 14
i32.add
i32.load8_u
i32.eqz
br_if 1
block
loop
local.get $p
i32.const 15
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 15
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 19
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const 17
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 17
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 19
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 6
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 16
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const 3
i32.add
local.get $p_offset
i32.const 3
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
br 0
end
end
local.get $p
i32.const 16
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 19
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 16
i32.add
i32.load8_u
i32.sub
i32.store8
local.get $p
i32.const 6
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 16
i32.add
i32.load8_u
i32.add
i32.store8
local.get $p
i32.const 16
i32.add
i32.const 0
i32.store8
end
br 0
end
end
local.get $p
i32.const 17
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 19
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 17
i32.add
i32.load8_u
i32.add
i32.store8
local.get $p
i32.const 16
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 19
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 16
i32.add
i32.load8_u
i32.sub
i32.store8
local.get $p
i32.const 6
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 16
i32.add
i32.load8_u
i32.add
i32.store8
local.get $p
i32.const 16
i32.add
i32.const 0
i32.store8
end
local.get $p
i32.const 17
i32.add
i32.const 0
i32.store8
end
local.get $p
i32.const 16
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const 3
i32.add
local.get $p_offset
i32.const 3
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 9
i32.sub
local.set $p
br 0
end
end
local.get $p
i32.const 19
i32.add
i32.const 0
i32.store8
local.get $p
i32.const 21
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const - 7
i32.add
local.get $p_offset
i32.const - 7
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 14
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 21
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 14
i32.add
i32.load8_u
i32.add
i32.store8
local.get $p
i32.const 19
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 14
i32.add
i32.load8_u
i32.add
i32.store8
local.get $p
i32.const 14
i32.add
i32.const 0
i32.store8
end
br 0
end
end
local.get $p
i32.const 18
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const - 4
i32.add
local.get $p_offset
i32.const - 4
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
block
loop
local.get $p
i32.const 14
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 14
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 18
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const 23
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 24
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 26
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 24
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 26
i32.add
i32.load8_u
i32.sub
i32.store8
local.get $p
i32.const 26
i32.add
i32.const 0
i32.store8
end
local.get $p
i32.const 24
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const 2
i32.add
local.get $p_offset
i32.const 2
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 15
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const 14
i32.add
i32.load8_u
i32.eqz
br_if 1
block
loop
local.get $p
i32.const 15
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 15
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 19
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const 16
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 16
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 19
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 6
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 17
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const 2
i32.add
local.get $p_offset
i32.const 2
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
br 0
end
end
local.get $p
i32.const 17
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 19
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 17
i32.add
i32.load8_u
i32.sub
i32.store8
local.get $p
i32.const 6
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 17
i32.add
i32.load8_u
i32.add
i32.store8
local.get $p
i32.const 17
i32.add
i32.const 0
i32.store8
end
br 0
end
end
local.get $p
i32.const 16
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 19
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 16
i32.add
i32.load8_u
i32.add
i32.store8
local.get $p
i32.const 17
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 19
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 17
i32.add
i32.load8_u
i32.sub
i32.store8
local.get $p
i32.const 6
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 17
i32.add
i32.load8_u
i32.add
i32.store8
local.get $p
i32.const 17
i32.add
i32.const 0
i32.store8
end
local.get $p
i32.const 16
i32.add
i32.const 0
i32.store8
end
local.get $p
i32.const 17
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const 2
i32.add
local.get $p_offset
i32.const 2
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 9
i32.sub
local.set $p
br 0
end
end
br 0
end
end
local.get $p
i32.const 18
i32.add
i32.const 0
i32.store8
br 0
end
end
local.get $p
i32.const 18
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const - 4
i32.add
local.get $p_offset
i32.const - 4
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
block
loop
local.get $p
i32.const 14
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 14
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 18
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 19
i32.add
i32.const 0
i32.store8
local.get $p
i32.const 21
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const - 7
i32.add
local.get $p_offset
i32.const - 7
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 14
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 21
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 14
i32.add
i32.load8_u
i32.add
i32.store8
local.get $p
i32.const 19
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 14
i32.add
i32.load8_u
i32.add
i32.store8
local.get $p
i32.const 14
i32.add
i32.const 0
i32.store8
end
block
loop
local.get $p
i32.const 23
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 14
i32.add
i32.load8_u
i32.eqz
br_if 1
block
loop
local.get $p
i32.const 15
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 15
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 19
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const 16
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 16
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 19
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 6
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 17
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const 2
i32.add
local.get $p_offset
i32.const 2
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
br 0
end
end
local.get $p
i32.const 17
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 19
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 17
i32.add
i32.load8_u
i32.sub
i32.store8
local.get $p
i32.const 6
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 17
i32.add
i32.load8_u
i32.add
i32.store8
local.get $p
i32.const 17
i32.add
i32.const 0
i32.store8
end
br 0
end
end
local.get $p
i32.const 16
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 19
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 16
i32.add
i32.load8_u
i32.add
i32.store8
local.get $p
i32.const 17
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 19
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 17
i32.add
i32.load8_u
i32.sub
i32.store8
local.get $p
i32.const 6
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 17
i32.add
i32.load8_u
i32.add
i32.store8
local.get $p
i32.const 17
i32.add
i32.const 0
i32.store8
end
local.get $p
i32.const 16
i32.add
i32.const 0
i32.store8
end
local.get $p
i32.const 17
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const 2
i32.add
local.get $p_offset
i32.const 2
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 9
i32.sub
local.set $p
br 0
end
end
br 0
end
end
block
loop
local.get $p
i32.const 23
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 25
i32.add
i32.const 0
i32.store8
local.get $p
i32.const 26
i32.add
i32.const 0
i32.store8
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 14
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 17
i32.add
i32.const 0
i32.store8
local.get $p
i32.const 18
i32.add
i32.const 0
i32.store8
block
loop
local.get $p
i32.const 23
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 28
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const - 4
i32.add
local.get $p_offset
i32.const - 4
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 24
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 28
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 24
i32.add
i32.load8_u
i32.add
i32.store8
local.get $p
i32.const 25
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 24
i32.add
i32.load8_u
i32.add
i32.store8
local.get $p
i32.const 24
i32.add
i32.const 0
i32.store8
end
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 14
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 23
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 29
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const - 5
i32.add
local.get $p_offset
i32.const - 5
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 24
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 29
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 24
i32.add
i32.load8_u
i32.add
i32.store8
local.get $p
i32.const 26
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 24
i32.add
i32.load8_u
i32.add
i32.store8
local.get $p
i32.const 24
i32.add
i32.const 0
i32.store8
end
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 14
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 23
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 15
i32.add
i32.store8
block
loop
local.get $p
i32.const 23
i32.add
i32.load8_u
i32.eqz
br_if 1
block
loop
local.get $p
i32.const 23
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 23
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 23
i32.add
local.set $p_offset
local.get $p_offset
i32.const 1
i32.add
local.tee $p_offset
i32.const 0
i32.store8
local.get $p_offset
i32.const 2
i32.add
local.tee $p_offset
i32.const 0
i32.store8
local.get $p_offset
i32.const 3
i32.add
local.tee $p_offset
i32.const 0
i32.store8
local.get $p_offset
i32.const 4
i32.add
local.tee $p_offset
i32.const 0
i32.store8
local.get $p_offset
i32.const 5
i32.add
local.tee $p_offset
i32.const 0
i32.store8
local.get $p_offset
i32.const 6
i32.add
local.tee $p_offset
i32.const 0
i32.store8
local.get $p_offset
i32.const 7
i32.add
local.tee $p_offset
i32.const 0
i32.store8
local.get $p_offset
i32.const 8
i32.add
local.tee $p_offset
i32.const 0
i32.store8
local.get $p_offset
i32.const 9
i32.add
local.tee $p_offset
i32.const 0
i32.store8
block
loop
local.get $p
i32.const 23
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 32
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 23
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const 23
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 24
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 14
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 23
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 24
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 28
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const - 4
i32.add
local.get $p_offset
i32.const - 4
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
block
loop
local.get $p
i32.const 24
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 24
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 28
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const 23
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 23
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 25
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const - 2
i32.add
local.get $p_offset
i32.const - 2
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 23
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 25
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 23
i32.add
i32.load8_u
i32.add
i32.store8
local.get $p
i32.const 27
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 23
i32.add
i32.load8_u
i32.add
i32.store8
local.get $p
i32.const 23
i32.add
i32.const 0
i32.store8
end
local.get $p
i32.const 23
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 15
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 9
i32.sub
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 33
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 24
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 25
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const 9
i32.add
local.get $p_offset
i32.const 9
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 9
i32.sub
local.set $p
br 0
end
end
local.get $p
i32.const 25
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const 9
i32.add
local.get $p_offset
i32.const 9
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 24
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 14
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 15
i32.add
i32.const 0
i32.store8
local.get $p
i32.const 14
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
block
loop
local.get $p
i32.const 18
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 18
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 14
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const 15
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 14
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 15
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 9
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
br 0
end
end
local.get $p
i32.const 14
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const 1
i32.add
local.get $p_offset
i32.const 1
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
br 0
end
end
local.get $p
i32.const 15
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const 3
i32.add
local.get $p_offset
i32.const 3
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 14
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 9
i32.sub
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 23
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 24
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 14
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 23
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 24
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 29
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const - 5
i32.add
local.get $p_offset
i32.const - 5
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
block
loop
local.get $p
i32.const 24
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 24
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 29
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const 23
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 23
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 26
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const - 3
i32.add
local.get $p_offset
i32.const - 3
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 23
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 26
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 23
i32.add
i32.load8_u
i32.add
i32.store8
local.get $p
i32.const 27
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 23
i32.add
i32.load8_u
i32.add
i32.store8
local.get $p
i32.const 23
i32.add
i32.const 0
i32.store8
end
local.get $p
i32.const 23
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 15
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 9
i32.sub
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 33
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 24
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 26
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const 9
i32.add
local.get $p_offset
i32.const 9
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 9
i32.sub
local.set $p
br 0
end
end
local.get $p
i32.const 26
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const 9
i32.add
local.get $p_offset
i32.const 9
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 24
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 14
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 15
i32.add
i32.const 0
i32.store8
local.get $p
i32.const 14
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
block
loop
local.get $p
i32.const 18
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 18
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 14
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const 15
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 14
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 15
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 9
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
br 0
end
end
local.get $p
i32.const 14
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const 1
i32.add
local.get $p_offset
i32.const 1
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
br 0
end
end
local.get $p
i32.const 15
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const 3
i32.add
local.get $p_offset
i32.const 3
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 14
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 9
i32.sub
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 23
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 27
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const - 36
i32.add
local.get $p_offset
i32.const - 36
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 14
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 23
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 15
i32.add
i32.store8
block
loop
local.get $p
i32.const 23
i32.add
i32.load8_u
i32.eqz
br_if 1
block
loop
local.get $p
i32.const 23
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 14
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
block
loop
local.get $p
i32.const 5
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 14
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 9
i32.sub
local.set $p
br 0
end
end
local.get $p
i32.const 23
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 44
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const 41
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 50
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 53
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 50
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 53
i32.add
i32.load8_u
i32.sub
i32.store8
local.get $p
i32.const 53
i32.add
i32.const 0
i32.store8
end
local.get $p
i32.const 53
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const 50
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 50
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 53
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 54
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const - 4
i32.add
local.get $p_offset
i32.const - 4
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
block
loop
local.get $p
i32.const 50
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 50
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 54
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
local.set $p_cached
block
loop
local.get $p
i32.const 41
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 45
i32.add
i32.const 1
i32.store8
local.get $p_cached
local.set $p
block
loop
local.get $p
i32.const 50
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 51
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
br 0
end
end
br 0
end
end
local.get $p
i32.const 50
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 54
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 50
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 54
i32.add
i32.load8_u
i32.sub
i32.store8
local.get $p
i32.const 54
i32.add
i32.const 0
i32.store8
end
local.get $p
i32.const 54
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const 50
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 50
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 54
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 53
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const - 3
i32.add
local.get $p_offset
i32.const - 3
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
block
loop
local.get $p
i32.const 50
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 50
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 53
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
local.set $p_cached
block
loop
local.get $p
i32.const 41
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 44
i32.add
i32.const 1
i32.store8
local.get $p_cached
local.set $p
block
loop
local.get $p
i32.const 50
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 51
i32.add
i32.const 1
i32.store8
br 0
end
end
br 0
end
end
local.get $p
i32.const 50
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const 51
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 51
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
block
loop
local.get $p
i32.const 50
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 9
i32.sub
local.set $p
br 0
end
end
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 41
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 43
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 45
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const - 4
i32.add
local.get $p_offset
i32.const - 4
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 41
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 45
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 41
i32.add
i32.load8_u
i32.add
i32.store8
local.get $p
i32.const 43
i32.add
i32.const 0
i32.store8
local.get $p
i32.const 41
i32.add
i32.const 0
i32.store8
end
local.get $p
i32.const 26
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 15
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 19
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 15
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 19
i32.add
i32.load8_u
i32.sub
i32.store8
local.get $p
i32.const 19
i32.add
i32.const 0
i32.store8
end
local.get $p
i32.const 19
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 15
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 19
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 15
i32.add
i32.load8_u
i32.sub
i32.store8
local.get $p
i32.const 13
i32.add
i32.load8_u
call $print
local.get $p
i32.const 15
i32.add
i32.const 0
i32.store8
end
local.get $p
i32.const 19
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 12
i32.add
i32.load8_u
call $print
local.get $p
i32.const 19
i32.add
i32.const 0
i32.store8
end
local.get $p
i32.const 16
i32.add
i32.const 0
i32.store8
local.get $p
i32.const 17
i32.add
i32.const 0
i32.store8
local.get $p
i32.const 18
i32.add
i32.const 0
i32.store8
local.get $p
i32.const 19
i32.add
i32.const 0
i32.store8
local.get $p
i32.const 20
i32.add
i32.const 0
i32.store8
local.get $p
i32.const 21
i32.add
i32.const 0
i32.store8
block
loop
local.get $p
i32.const 24
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 25
i32.add
i32.const 0
i32.store8
local.get $p
i32.const 26
i32.add
i32.const 0
i32.store8
local.get $p
i32.const 27
i32.add
i32.const 0
i32.store8
local.get $p
i32.const 28
i32.add
i32.const 0
i32.store8
local.get $p
i32.const 29
i32.add
i32.const 0
i32.store8
local.get $p
i32.const 30
i32.add
i32.const 0
i32.store8
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 15
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 24
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 29
i32.add
i32.const 0
i32.store8
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 15
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 16
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 11
i32.add
i32.store8
block
loop
local.get $p
i32.const 16
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 16
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 16
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const 9
i32.add
local.get $p_offset
i32.const 9
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 20
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 29
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const 15
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 22
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const - 7
i32.add
local.get $p_offset
i32.const - 7
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
block
loop
local.get $p
i32.const 15
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 15
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 22
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 22
i32.add
i32.const 0
i32.store8
block
loop
local.get $p
i32.const 24
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 15
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 22
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const - 6
i32.add
local.get $p_offset
i32.const - 6
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
block
loop
local.get $p
i32.const 16
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 16
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 22
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const 15
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 22
i32.add
i32.const 1
i32.store8
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 9
i32.sub
local.set $p
br 0
end
end
br 0
end
end
local.get $p
i32.const 22
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const - 7
i32.add
local.get $p_offset
i32.const - 7
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
block
loop
local.get $p
i32.const 15
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 15
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 22
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const 24
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 25
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 29
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 25
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 29
i32.add
i32.load8_u
i32.sub
i32.store8
local.get $p
i32.const 29
i32.add
i32.const 0
i32.store8
end
local.get $p
i32.const 25
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const 4
i32.add
local.get $p_offset
i32.const 4
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 22
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const 15
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 20
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const 2
i32.add
local.get $p_offset
i32.const 2
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 9
i32.sub
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 24
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 15
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 16
i32.add
i32.const 0
i32.store8
local.get $p
i32.const 15
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
block
loop
local.get $p
i32.const 22
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 22
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 15
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const 16
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 15
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 16
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 13
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
br 0
end
end
local.get $p
i32.const 15
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const 1
i32.add
local.get $p_offset
i32.const 1
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
br 0
end
end
local.get $p
i32.const 16
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const 6
i32.add
local.get $p_offset
i32.const 6
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 15
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 9
i32.sub
local.set $p
br 0
end
end
local.get $p
i32.const 22
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 18
i32.add
i32.const 1
i32.store8
br 0
end
end
local.get $p
i32.const 15
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 22
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 15
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 22
i32.add
i32.load8_u
i32.sub
i32.store8
local.get $p
i32.const 22
i32.add
i32.const 0
i32.store8
end
local.get $p
i32.const 22
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const 15
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 15
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 22
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
block
loop
local.get $p
i32.const 24
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 29
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const 2
i32.add
local.get $p_offset
i32.const 2
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 15
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 16
i32.add
i32.const 0
i32.store8
local.get $p
i32.const 15
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
block
loop
local.get $p
i32.const 22
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 22
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 15
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const 16
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 15
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 16
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 13
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
br 0
end
end
local.get $p
i32.const 15
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const 1
i32.add
local.get $p_offset
i32.const 1
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
br 0
end
end
local.get $p
i32.const 16
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const 6
i32.add
local.get $p_offset
i32.const 6
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 15
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 9
i32.sub
local.set $p
br 0
end
end
local.get $p
i32.const 16
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 5
i32.add
i32.store8
block
loop
local.get $p
i32.const 16
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 16
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 16
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const 9
i32.add
local.get $p_offset
i32.const 9
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 20
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const 15
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 24
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 29
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 24
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 29
i32.add
i32.load8_u
i32.sub
i32.store8
local.get $p
i32.const 29
i32.add
i32.const 0
i32.store8
end
local.get $p
i32.const 29
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const 24
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 24
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 29
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 31
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const - 7
i32.add
local.get $p_offset
i32.const - 7
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
block
loop
local.get $p
i32.const 24
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 24
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 31
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
local.set $p_cached
block
loop
local.get $p
i32.const 15
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 19
i32.add
i32.const 1
i32.store8
local.get $p_cached
local.set $p
block
loop
local.get $p
i32.const 24
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 25
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
br 0
end
end
br 0
end
end
local.get $p
i32.const 24
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 31
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 24
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 31
i32.add
i32.load8_u
i32.sub
i32.store8
local.get $p
i32.const 31
i32.add
i32.const 0
i32.store8
end
local.get $p
i32.const 31
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const 24
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 24
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 31
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 29
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const - 5
i32.add
local.get $p_offset
i32.const - 5
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
block
loop
local.get $p
i32.const 24
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 24
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 29
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
local.set $p_cached
block
loop
local.get $p
i32.const 15
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 18
i32.add
i32.const 1
i32.store8
local.get $p_cached
local.set $p
block
loop
local.get $p
i32.const 24
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 25
i32.add
i32.const 1
i32.store8
br 0
end
end
br 0
end
end
local.get $p
i32.const 24
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const 25
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 25
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
block
loop
local.get $p
i32.const 24
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 9
i32.sub
local.set $p
br 0
end
end
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 15
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 19
i32.add
i32.const 0
i32.store8
local.get $p
i32.const 16
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 5
i32.add
i32.store8
block
loop
local.get $p
i32.const 16
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 16
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 16
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const 9
i32.add
local.get $p_offset
i32.const 9
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 20
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
block
loop
local.get $p
i32.const 15
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
br 0
end
end
local.get $p
i32.const 27
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const - 13
i32.add
i32.load8_u
call $print
block
loop
local.get $p
i32.const - 3
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 3
i32.add
i32.const 0
i32.store8
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const - 12
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const - 11
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 10
i32.add
i32.store8
block
loop
local.get $p
i32.const - 11
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 11
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const - 11
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const 9
i32.add
local.get $p_offset
i32.const 9
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const - 6
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 3
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const - 12
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const - 4
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const - 8
i32.add
local.get $p_offset
i32.const - 8
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
block
loop
local.get $p
i32.const - 12
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 12
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const - 4
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const - 4
i32.add
i32.const 0
i32.store8
block
loop
local.get $p
i32.const - 3
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const - 12
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 4
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const - 7
i32.add
local.get $p_offset
i32.const - 7
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
block
loop
local.get $p
i32.const - 11
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 11
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const - 4
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const - 12
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const - 4
i32.add
i32.const 1
i32.store8
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 9
i32.sub
local.set $p
br 0
end
end
br 0
end
end
local.get $p
i32.const - 4
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const - 8
i32.add
local.get $p_offset
i32.const - 8
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
block
loop
local.get $p
i32.const - 12
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 12
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const - 4
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const - 3
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 2
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 3
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const - 2
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 3
i32.add
i32.load8_u
i32.sub
i32.store8
local.get $p
i32.const 3
i32.add
i32.const 0
i32.store8
end
local.get $p
i32.const - 2
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const 5
i32.add
local.get $p_offset
i32.const 5
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const - 4
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const - 12
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 6
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const 2
i32.add
local.get $p_offset
i32.const 2
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 9
i32.sub
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const - 3
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const - 12
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 11
i32.add
i32.const 0
i32.store8
local.get $p
i32.const - 12
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
block
loop
local.get $p
i32.const - 4
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 4
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const - 12
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const - 11
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 12
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const - 11
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const - 13
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
br 0
end
end
local.get $p
i32.const - 12
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const 1
i32.add
local.get $p_offset
i32.const 1
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
br 0
end
end
local.get $p
i32.const - 11
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const 7
i32.add
local.get $p_offset
i32.const 7
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const - 12
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 9
i32.sub
local.set $p
br 0
end
end
local.get $p
i32.const - 4
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const - 9
i32.add
i32.const 1
i32.store8
br 0
end
end
local.get $p
i32.const - 12
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const - 4
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const - 12
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const - 4
i32.add
i32.load8_u
i32.sub
i32.store8
local.get $p
i32.const - 4
i32.add
i32.const 0
i32.store8
end
local.get $p
i32.const - 4
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const - 12
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 12
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const - 4
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
block
loop
local.get $p
i32.const - 3
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 3
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const 2
i32.add
local.get $p_offset
i32.const 2
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const - 12
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 11
i32.add
i32.const 0
i32.store8
local.get $p
i32.const - 12
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
block
loop
local.get $p
i32.const - 4
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 4
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const - 12
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const - 11
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 12
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const - 11
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const - 13
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
br 0
end
end
local.get $p
i32.const - 12
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const 1
i32.add
local.get $p_offset
i32.const 1
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
br 0
end
end
local.get $p
i32.const - 11
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const 7
i32.add
local.get $p_offset
i32.const 7
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const - 12
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 9
i32.sub
local.set $p
br 0
end
end
local.get $p
i32.const - 11
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 5
i32.add
i32.store8
block
loop
local.get $p
i32.const - 11
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 11
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const - 11
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const 9
i32.add
local.get $p_offset
i32.const 9
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const - 6
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 21
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const 15
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 24
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 30
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 24
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 30
i32.add
i32.load8_u
i32.sub
i32.store8
local.get $p
i32.const 30
i32.add
i32.const 0
i32.store8
end
local.get $p
i32.const 30
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const 24
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 24
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 30
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 32
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const - 8
i32.add
local.get $p_offset
i32.const - 8
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
block
loop
local.get $p
i32.const 24
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 24
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 32
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
local.set $p_cached
block
loop
local.get $p
i32.const 15
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 19
i32.add
i32.const 1
i32.store8
local.get $p_cached
local.set $p
block
loop
local.get $p
i32.const 24
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 25
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
br 0
end
end
br 0
end
end
local.get $p
i32.const 24
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
i32.const 32
i32.add
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p
i32.const 24
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
local.get $p
i32.const 32
i32.add
i32.load8_u
i32.sub
i32.store8
local.get $p
i32.const 32
i32.add
i32.const 0
i32.store8
end
local.get $p
i32.const 32
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const 24
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 24
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 32
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 30
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const - 6
i32.add
local.get $p_offset
i32.const - 6
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
block
loop
local.get $p
i32.const 24
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 24
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 30
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
local.get $p
local.set $p_cached
block
loop
local.get $p
i32.const 15
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 18
i32.add
i32.const 1
i32.store8
local.get $p_cached
local.set $p
block
loop
local.get $p
i32.const 24
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 25
i32.add
i32.const 1
i32.store8
br 0
end
end
br 0
end
end
local.get $p
i32.const 24
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.add
i32.store8
block
loop
local.get $p
i32.const 25
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 25
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
block
loop
local.get $p
i32.const 24
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 9
i32.sub
local.set $p
br 0
end
end
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
block
loop
local.get $p
i32.const 15
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 19
i32.add
i32.const 0
i32.store8
local.get $p
i32.const 16
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 5
i32.add
i32.store8
block
loop
local.get $p
i32.const 16
i32.add
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const 16
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 16
i32.add
local.tee $p_offset
i32.load8_u
i32.const 0
i32.gt_u
if
    local.get $p_offset
i32.const 9
i32.add
local.get $p_offset
i32.const 9
i32.add
i32.load8_u
local.get $p_offset
i32.load8_u
i32.add
i32.store8
local.get $p_offset
i32.const 0
i32.store8
end
local.get $p
i32.const 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 21
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
local.get $p
i32.const 48
i32.add
local.tee $p_offset
local.get $p_offset
i32.load8_u
i32.const 1
i32.sub
i32.store8
block
loop
local.get $p
i32.const 42
i32.add
local.tee $p_offset
i32.load8_u
i32.eqz
br_if 1
local.get $p
i32.const - 9
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 54
i32.add
local.set $p
br 0
end
end
local.get $p
i32.const 9
i32.sub
local.set $p
br 0
end
end
    )
(export "run"(func $run))
    )