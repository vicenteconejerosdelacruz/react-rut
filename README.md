# react rut component

Author: @vichoconejeros

How to use this

```
on the web
<Rut value={rut} onChange={onRutChange} onValid={onRutValido} >
	<input type="text" name="rut" placeholder="Rut" required></input>
</Rut>

on react native
<Rut value={rut} onChangeText={onRutChange} onValid={onRutValido} >
	<TextInput placeholder="Rut"></TextInput>
</Rut>
```
