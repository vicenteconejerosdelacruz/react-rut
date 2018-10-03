import React, { Component } from 'react';

/*
Author: @vichoconejeros
*/

class Rut extends Component {
	
	formato = (rut) => {
		if (!rut | typeof rut !== 'string') return false
		return /^\d{1,2}.\d{3}.\d{3}-[K|\d]{1}$/.test(rut)
	}
	
	digitoVerificador = (rut) => {
		let multiplos = [2,3,4,5,6,7]
		let digitos = rut.split('-')[0].split('').reverse()
		let digitoVerificador = rut.split('-')[1]
		let acumulador = 0
		digitos.forEach((elem,index)=>{
			elem = Number(elem)
			let multiplo = multiplos[index%multiplos.length]
			let valor = elem*multiplo
			acumulador+=valor
		})
		let digito = 11 - acumulador%11
		let digimap = [NaN,'1','2','3','4','5','6','7','8','9','K','11']
		
		return digimap[digito]===digitoVerificador
	}

		
	reformat = (rutViejo,rutNuevo) => {
		if(rutNuevo !==''){
			let digitoValido = (digito) => { return (((digito>='0') && (digito<='9')) || digito==='k' || digito==='K') }
			let chars = rutNuevo.split('').filter(digitoValido)
			let digito = chars[chars.length-1]
			if(digitoValido(digito) && chars.length<10){
				if(chars.length>1){
					chars.splice(chars.length-1,0,'-');
				}
				if(chars.length>5){
					chars.splice(chars.length-5,0,'.');
				}
				if(chars.length>9){
					chars.splice(chars.length-9,0,'.');
				}
				return chars.join('').toUpperCase();
			} else {
				return rutViejo;
			}
		}
		return '';
	}	
	
	onChange = (e) => {
		let value = this.reformat(this.props.value,e.target.value)
		e.target.value = value
		this.props.onChange(e)
		if(this.props.onValid) this.props.onValid(this.rutValido(value))
	}
	
	renderChildren = () =>{
	  return React.Children.map(this.props.children, (child, i)=>{
		  
		let el = React.cloneElement(child,{
		  value:this.props.value,
		  onChange:this.onChange
		})
		return el
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