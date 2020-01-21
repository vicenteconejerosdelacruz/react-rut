import React, { Component } from 'react';

/*
Author: @vichoconejeros

How to use this

<Rut value={this.state.rut} onChange={this.onRutChange} onValid={this.onRutValido} >
	<input type="text" name="rut" placeholder="Rut" required></input>
</Rut>

*/

class Rut extends Component {
	
	formato = (rut) => {
		if (!rut | typeof rut !== 'string') return false
		return /^\d{1,2}.\d{3}.\d{3}-[k|K|\d]{1}$/.test(rut)
	}
	
	digitoVerificador = (rut) => {
		let multiplos = [2,3,4,5,6,7]
		let digitos = rut.split('-')[0].split('').reverse()
		let digitoVerificador = rut.split('-')[1].toUpperCase()
		let digito = 11 - digitos.reduce((acc,elem,index)=>(acc+Number(elem)*multiplos[index%multiplos.length]),0)%11
		let digimap = [NaN,'1','2','3','4','5','6','7','8','9','K','11']	
		return digimap[digito]===digitoVerificador
	}

	 
	rutValido = (rut) => {
		return formato(rut) && digitoVerificador(rut)
	}
		
	reformat = (rutViejo,rutNuevo) => {
		let digitos = ['0','1','2','3','4','5','6','7','8','9','K','k']
		let digitoValido = (digito) => digitos.includes(digito)			
		
		if(rutNuevo !==''){
			
			let chars = rutNuevo.split('').filter(digitoValido)
			let digito = chars[chars.length-1]
			
			if(digitoValido(digito)){
				[1,5,9].forEach(index => { if(chars.length>index){ chars.splice(chars.length-index,0,(index===1)?'-':'.') }} )			
				return chars.join('').toUpperCase();
			} else {
				return rutViejo;
			}
		}
		return '';
	}	
	
	onChange = (e) => {
		e.target.value = this.reformat(this.props.value,e.target.value)
		this.props.onChange(e)
		if(this.props.onValid) this.props.onValid(this.rutValido(e.target.value))
	}
	
	
	renderChildren = () =>{
	  return React.Children.map(this.props.children, (child, i)=>{
		return React.cloneElement(child,{
		  value:this.props.value,
		  onChange:this.onChange
		})
	  })
	}
	
	render(){
		return (
			<div>
				{this.renderChildren()}
			</div>
		)
	}
}

export default Rut
