# Sample Zk Dapp

## Dependencies
```
npm intall -g circom 
npm install -g snarkjs
```

## Compile circuit
```
circom circuits/circuit.circom --r1cs --wasm --sym
```

## Load the compiled circuit into signaljs

### View circuit information
```
snarkjs info -r circuit.r1cs
```

### Print circuit constraint
```
snarkjs r1cs print circuit.r1cs circuit.sym
```

## Generate Witness
1. create input.json
```json
{"a": 3, "b": 11}
```

2. generate witness
```
node generate_witness.js circuit.wasm input.json witness.wtns
```


### Trusted Setup
1. 
```
snarkjs powersoftau new bn128 12 pot12_0000.ptau -v
```

2. 
```
snarkjs powersoftau contribute pot12_0000.ptau pot12_0001.ptau --name="First contribution" -v
```

3. 
```
snarkjs powersoftau prepare phase2 pot12_0001.ptau pot12_final.ptau -v
```


4. generate zkey
```
snarkjs groth16 setup circuit.r1cs pot12_final.ptau circuit_0000.zkey
```

5.
```
snarkjs zkey contribute circuit_0000.zkey circuit_0001.zkey --name="1st Contributor Name" -v
```

6. export verification key
```
snarkjs zkey export verificationkey circuit_0001.zkey verification_key.json
```

## Generate proof
```
snarkjs groth16 prove multiplier2_0001.zkey witness.wtns proof.json public.json
```

## Verify proof
```
snarkjs groth16 verify verification_key.json public.json proof.json
```