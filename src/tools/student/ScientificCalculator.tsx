import { useState } from 'react'
import { Delete } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ScientificCalculator() {
  const [display, setDisplay] = useState('0')
  const [expression, setExpression] = useState('')


  const append = (val: string) => {
    if (display === '0' && val !== '.') {
      setDisplay(val)
      setExpression(expression + val)
    } else {
      setDisplay(display + val)
      setExpression(expression + val)
    }
  }

  const operator = (op: string) => {
    setExpression(expression + ' ' + op + ' ')
    setDisplay('0')
  }

  const calculate = () => {
    try {
      // Replace math functions for eval
      const expr = expression
        .replace(/sin\(/g, 'Math.sin(')
        .replace(/cos\(/g, 'Math.cos(')
        .replace(/tan\(/g, 'Math.tan(')
        .replace(/log\(/g, 'Math.log10(')
        .replace(/ln\(/g, 'Math.log(')
        .replace(/sqrt\(/g, 'Math.sqrt(')
        .replace(/π/g, 'Math.PI')
        .replace(/e(?![a-z])/g, 'Math.E')
        .replace(/\^/g, '**')
      const result = new Function('return ' + expr)()
      setDisplay(String(result))
      setExpression(String(result))
    } catch {
      setDisplay('Error')
      setExpression('')
    }
  }

  const clear = () => { setDisplay('0'); setExpression('') }
  const backspace = () => {
    if (display.length > 1) setDisplay(display.slice(0, -1))
    else setDisplay('0')
    if (expression.length > 0) setExpression(expression.slice(0, -1))
  }

  const sciFunc = (fn: string) => {
    setExpression(expression + fn + '(')
    setDisplay(fn + '(')
  }

  const btnClass = "h-12 rounded-lg text-sm font-medium transition-colors"
  const numClass = `${btnClass} bg-card border border-border hover:bg-secondary`
  const opClass = `${btnClass} bg-primary/10 text-primary hover:bg-primary/20 font-semibold`
  const fnClass = `${btnClass} bg-secondary text-muted-foreground hover:text-foreground`

  return (
    <div className="max-w-md mx-auto space-y-4">
      {/* Display */}
      <div className="p-4 rounded-xl border border-border bg-card">
        <p className="text-xs text-muted-foreground font-mono mb-1 truncate h-4">{expression || ' '}</p>
        <p className="text-3xl font-bold font-mono text-right tabular-nums truncate">{display}</p>
      </div>

      {/* Scientific functions row */}
      <div className="grid grid-cols-5 gap-1.5">
        <button onClick={() => sciFunc('sin')} className={fnClass}>sin</button>
        <button onClick={() => sciFunc('cos')} className={fnClass}>cos</button>
        <button onClick={() => sciFunc('tan')} className={fnClass}>tan</button>
        <button onClick={() => sciFunc('log')} className={fnClass}>log</button>
        <button onClick={() => sciFunc('ln')} className={fnClass}>ln</button>
        <button onClick={() => sciFunc('sqrt')} className={fnClass}>√</button>
        <button onClick={() => operator('^')} className={fnClass}>x^y</button>
        <button onClick={() => append('π')} className={fnClass}>π</button>
        <button onClick={() => append('e')} className={fnClass}>e</button>
        <button onClick={() => append('(')} className={fnClass}>(</button>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-4 gap-1.5">
        <button onClick={clear} className={`${btnClass} bg-destructive/10 text-destructive hover:bg-destructive/20 font-semibold`}>AC</button>
        <button onClick={() => append(')')} className={fnClass}>)</button>
        <button onClick={() => operator('%')} className={opClass}>%</button>
        <button onClick={() => operator('/')} className={opClass}>÷</button>

        <button onClick={() => append('7')} className={numClass}>7</button>
        <button onClick={() => append('8')} className={numClass}>8</button>
        <button onClick={() => append('9')} className={numClass}>9</button>
        <button onClick={() => operator('*')} className={opClass}>×</button>

        <button onClick={() => append('4')} className={numClass}>4</button>
        <button onClick={() => append('5')} className={numClass}>5</button>
        <button onClick={() => append('6')} className={numClass}>6</button>
        <button onClick={() => operator('-')} className={opClass}>−</button>

        <button onClick={() => append('1')} className={numClass}>1</button>
        <button onClick={() => append('2')} className={numClass}>2</button>
        <button onClick={() => append('3')} className={numClass}>3</button>
        <button onClick={() => operator('+')} className={opClass}>+</button>

        <button onClick={() => append('0')} className={`${numClass} col-span-2`}>0</button>
        <button onClick={() => append('.')} className={numClass}>.</button>
        <button onClick={calculate} className={`${btnClass} bg-primary text-primary-foreground hover:bg-primary/90 font-bold`}>=</button>
      </div>

      <div className="flex justify-center">
        <Button variant="ghost" size="sm" onClick={backspace}>
          <Delete className="h-4 w-4 mr-1" /> Backspace
        </Button>
      </div>
    </div>
  )
}
