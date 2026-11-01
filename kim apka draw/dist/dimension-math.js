/* Small arithmetic parser. Never executes JavaScript. All values are mm. */
(function(root){
function calculate(raw){let s=String(raw).trim().replace(/^=/,'').replaceAll(',','.').replace(/[×xX]/g,'*').replace(/÷/g,'/').replace(/[−–]/g,'-').replace(/\s/g,'');if(!s||s.length>200)throw Error('Wpisz wymiar lub działanie, np. 1200+850+600.');if(!/^[0-9.+*/()\-]+$/.test(s))throw Error('Użyj liczb oraz + − * / i nawiasów. Wszystkie wartości podawaj w mm.');let i=0;
const check=n=>{if(!Number.isFinite(n)||Math.abs(n)>1e12)throw Error('Wynik działania jest zbyt duży.');return n};
function value(){let sign=1;while(s[i]==='+'||s[i]==='-'){if(s[i++]==='-')sign=-sign}let n;if(s[i]==='('){i++;n=sum();if(s[i++]!==')')throw Error('Sprawdź nawiasy.')}else{const m=s.slice(i).match(/^(?:\d+(?:\.\d*)?|\.\d+)/);if(!m)throw Error('Dokończ działanie — brakuje liczby.');i+=m[0].length;n=Number(m[0])}return check(sign*n)}
function product(){let n=value();while(s[i]==='*'||s[i]==='/'){const op=s[i++],v=value();if(op==='/'&&v===0)throw Error('Nie można dzielić przez zero.');n=check(op==='*'?n*v:n/v)}return n}
function sum(){let n=product();while(s[i]==='+'||s[i]==='-'){const op=s[i++],v=product();n=check(op==='+'?n+v:n-v)}return n}
const n=sum();if(i!==s.length)throw Error('Sprawdź zapis działania i nawiasy.');return Math.round(n*1000)/1000}
const api={calculate};if(typeof module!=='undefined')module.exports=api;else root.DimensionMath=api;
})(typeof globalThis!=='undefined'?globalThis:this);
