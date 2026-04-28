import React, { useState } from 'react';
import { Droplet, Activity, Heart, Wind, Scale, Beaker, User, Baby } from 'lucide-react';
import MedicalScores from './MedicalScores';

const Card = ({ children, className = "", ...props }: { children: React.ReactNode, className?: string, [key: string]: any }) => (
  <div 
    {...props}
    className={`bg-card text-card-foreground rounded-2xl border border-border p-6 shadow-sm hover:shadow-md transition-shadow duration-200 ${className}`}
  >
    {children}
  </div>
);

export default function Calculators() {
  // Gasto Urinario State
  const [guOrina, setGuOrina] = useState('');
  const [guHoras, setGuHoras] = useState('');
  const [guPeso, setGuPeso] = useState('');
  const [guResult, setGuResult] = useState<{ value: number, class: string, meaning: string } | null>(null);

  const calcGastoUrinario = () => {
    const orina = parseFloat(guOrina);
    const horas = parseFloat(guHoras);
    const peso = parseFloat(guPeso);
    if (orina > 0 && horas > 0 && peso > 0) {
      const res = orina / (peso * horas);
      let classification = '';
      let meaning = '';
      if (res > 0.5) {
        classification = 'Euresis Normal';
        meaning = 'Riñones bien perfundidos.';
      } else if (res >= 0.3) {
        classification = 'Oliguria';
        meaning = 'Posible deshidratación o falla renal temprana.';
      } else if (res >= 0.1) {
        classification = 'Oliguria Grave';
        meaning = 'Riesgo alto de lesión renal aguda.';
      } else {
        classification = 'Anuria';
        meaning = 'Cese casi total de la función renal.';
      }
      setGuResult({ value: res, class: classification, meaning });
    }
  };

  // Peso Ideal State
  const [piAltura, setPiAltura] = useState('');
  const [piSexo, setPiSexo] = useState<'M' | 'F'>('M');
  const [piResult, setPiResult] = useState<number | null>(null);

  const calcPesoIdeal = () => {
    const altura = parseFloat(piAltura);
    if (altura > 0) {
      const base = piSexo === 'M' ? 50 : 45.5;
      const res = base + 0.9 * (altura - 152);
      setPiResult(res > 0 ? res : 0);
    }
  };

  // Pérdidas por O2 State
  const [o2Peso, setO2Peso] = useState('');
  const [o2Horas, setO2Horas] = useState('');
  const [o2Dispositivo, setO2Dispositivo] = useState('0.5');
  const [o2Result, setO2Result] = useState<number | null>(null);

  const calcPerdidasO2 = () => {
    const peso = parseFloat(o2Peso);
    const horas = parseFloat(o2Horas);
    const factor = parseFloat(o2Dispositivo);
    if (peso > 0 && horas > 0) {
      setO2Result(peso * factor * horas);
    }
  };

  // Trastornos Ácido-Base State
  const [abHCO3, setAbHCO3] = useState('');
  const [abPCO2, setAbPCO2] = useState('');
  const [abTipo, setAbTipo] = useState<'acidosis_met' | 'alcalosis_met' | 'acidosis_resp' | 'alcalosis_resp'>('acidosis_met');
  const [abResult, setAbResult] = useState<{ expected: string, interpretation: string } | null>(null);

  const calcAcidoBase = () => {
    const hco3 = parseFloat(abHCO3);
    const pco2 = parseFloat(abPCO2);
    if (hco3 > 0 && pco2 > 0) {
      if (abTipo === 'acidosis_met') {
        const expected = (1.5 * hco3) + 8;
        const min = expected - 2;
        const max = expected + 2;
        let interp = '';
        if (pco2 >= min && pco2 <= max) {
          interp = 'Acidosis metabólica compensada.';
        } else if (pco2 > max) {
          interp = 'Acidosis metabólica + Acidosis respiratoria concomitante (el paciente no está ventilando lo suficiente).';
        } else {
          interp = 'Acidosis metabólica + Alcalosis respiratoria concomitante.';
        }
        setAbResult({ expected: `pCO2: ${min.toFixed(1)} - ${max.toFixed(1)}`, interpretation: interp });
      } else if (abTipo === 'alcalosis_met') {
        const expected = (0.7 * (hco3 - 24)) + 40;
        const min = expected - 2;
        const max = expected + 2;
        let interp = '';
        if (pco2 >= min && pco2 <= max) {
          interp = 'Alcalosis metabólica compensada.';
        } else if (pco2 > max) {
          interp = 'Alcalosis metabólica + Acidosis respiratoria añadida.';
        } else {
          interp = 'Alcalosis metabólica + Alcalosis respiratoria añadida.';
        }
        setAbResult({ expected: `pCO2: ${min.toFixed(1)} - ${max.toFixed(1)}`, interpretation: interp });
      } else if (abTipo === 'acidosis_resp') {
        const deltaPCO2 = pco2 - 40;
        if (deltaPCO2 > 0) {
          const aguda = 24 + (deltaPCO2 / 10) * 1;
          const cronicaMin = 24 + (deltaPCO2 / 10) * 3.5;
          const cronicaMax = 24 + (deltaPCO2 / 10) * 4;
          setAbResult({ 
            expected: `HCO3 Agudo: ${aguda.toFixed(1)} | Crónico: ${cronicaMin.toFixed(1)} - ${cronicaMax.toFixed(1)}`, 
            interpretation: 'Compara el HCO3 medido con los valores esperados para determinar si es un cuadro agudo o crónico.' 
          });
        } else {
          setAbResult({ expected: '-', interpretation: 'El pCO2 debe ser mayor a 40 para acidosis respiratoria.' });
        }
      } else if (abTipo === 'alcalosis_resp') {
        const deltaPCO2 = 40 - pco2;
        if (deltaPCO2 > 0) {
          const aguda = 24 - (deltaPCO2 / 10) * 2;
          const cronica = 24 - (deltaPCO2 / 10) * 5;
          setAbResult({ 
            expected: `HCO3 Agudo: ${aguda.toFixed(1)} | Crónico: ${cronica.toFixed(1)}`, 
            interpretation: 'Compara el HCO3 medido con los valores esperados para determinar si es un cuadro agudo o crónico.' 
          });
        } else {
          setAbResult({ expected: '-', interpretation: 'El pCO2 debe ser menor a 40 para alcalosis respiratoria.' });
        }
      }
    }
  };

  // Tensión Arterial Media State
  const [tamSistolica, setTamSistolica] = useState('');
  const [tamDiastolica, setTamDiastolica] = useState('');
  const [tamResult, setTamResult] = useState<number | null>(null);

  const calcTAM = () => {
    const ps = parseFloat(tamSistolica);
    const pd = parseFloat(tamDiastolica);
    if (ps > 0 && pd > 0) {
      setTamResult(((pd * 2) + ps) / 3);
    }
  };

  // Cálculo de Goteo State
  const [gotVolumen, setGotVolumen] = useState('');
  const [gotHoras, setGotHoras] = useState('');
  const [gotFactor, setGotFactor] = useState('20');
  const [gotResult, setGotResult] = useState<number | null>(null);

  const calcGoteo = () => {
    const vol = parseFloat(gotVolumen);
    const horas = parseFloat(gotHoras);
    const factor = parseFloat(gotFactor);
    if (vol > 0 && horas > 0) {
      setGotResult((vol * factor) / (horas * 60));
    }
  };

  // IMC State
  const [imcPeso, setImcPeso] = useState('');
  const [imcAltura, setImcAltura] = useState('');
  const [imcResult, setImcResult] = useState<{ value: number, class: string } | null>(null);

  const calcIMC = () => {
    const peso = parseFloat(imcPeso);
    const alturaCm = parseFloat(imcAltura);
    if (peso > 0 && alturaCm > 0) {
      const alturaM = alturaCm / 100;
      const imc = peso / (alturaM * alturaM);
      let classification = '';
      if (imc < 18.5) classification = 'Bajo peso';
      else if (imc < 25) classification = 'Normal';
      else if (imc < 30) classification = 'Sobrepeso';
      else classification = 'Obesidad';
      
      setImcResult({ value: imc, class: classification });
    }
  };

  // Dosis Pediátrica State
  const [pedTipo, setPedTipo] = useState<'bolo' | 'infusion'>('bolo');
  const [pedPeso, setPedPeso] = useState('');
  const [pedEdad, setPedEdad] = useState('');
  const [pedDosis, setPedDosis] = useState('');
  const [pedMasa, setPedMasa] = useState('');
  const [pedVol, setPedVol] = useState('');
  const [pedResult, setPedResult] = useState<{ value: string, text: string } | null>(null);

  const calcPediatrica = () => {
    let p = parseFloat(pedPeso);
    const e = parseFloat(pedEdad);
    // Si no hay peso pero hay edad (Estimación APLS: Edad * 2 + 8 para niños > 1 y < 10)
    if (isNaN(p) && !isNaN(e) && e >= 1 && e <= 10) {
      p = e * 2 + 8;
    }
    const d = parseFloat(pedDosis);
    const m = parseFloat(pedMasa);
    const v = parseFloat(pedVol);

    if (p > 0 && d > 0 && m > 0 && v > 0) {
      if (pedTipo === 'bolo') {
        // Dosis total = p * d. Volumen = (Total * v) / m
        const totalDose = p * d;
        const vol = (totalDose * v) / m;
        setPedResult({ 
          value: `${vol.toFixed(2)} ml`, 
          text: `Dosis calculada para ${p.toFixed(1)} kg. Total administrar: ${totalDose.toFixed(2)} (misma unidad de concentración).` 
        });
      } else {
        // Infusión asume Dosis en mcg/kg/min, Masa en mg, Vol en ml
        const mcg_h = d * p * 60;
        const conc_mcg_ml = (m * 1000) / v;
        const ml_h = mcg_h / conc_mcg_ml;
        
        // Calcular regla de los 6: Velocidad para dar 1 mcg/kg/min con dilución estándar
        const regla6 = p * 6; // mg en 100ml a 1ml/h = 1mcg/kg/min
        
        setPedResult({ 
          value: `${ml_h.toFixed(2)} ml/h`, 
          text: `Para ${p.toFixed(1)} kg a ${d} mcg/kg/min. (Regla rápida: diluir ${regla6.toFixed(1)} mg en 100ml para que 1ml/h = 1mcg/kg/min)` 
        });
      }
    } else {
      setPedResult(null);
    }
  };

  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Activity className="text-primary" />
          Escalas y Scores Clínicos
        </h2>
        <MedicalScores />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 border-t pt-8">
          <Beaker className="text-primary" />
          Calculadoras de Uso Frecuente
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 1. Gasto Urinario */}
          <Card>
        <h3 className="text-xl font-bold mb-4 flex items-center"><Activity size={20} className="mr-2 text-primary" /> Gasto Urinario</h3>
        <div className="space-y-4">
          <div className="bg-accent/30 p-4 rounded-xl">
            <p className="text-sm font-bold text-center">Fórmula: Volumen (ml) ÷ (Peso Ideal (kg) × Horas)</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-xs font-bold text-muted-foreground uppercase">Total Orina (ml)</label>
              <input type="number" value={guOrina} onChange={e => setGuOrina(e.target.value)} placeholder="Ej. 800" className="w-full mt-1 p-2 rounded-lg border border-border bg-background" />
            </div>
            <div>
              <label className="text-xs font-bold text-muted-foreground uppercase">Tiempo (horas)</label>
              <input type="number" value={guHoras} onChange={e => setGuHoras(e.target.value)} placeholder="Ej. 6" className="w-full mt-1 p-2 rounded-lg border border-border bg-background" />
            </div>
            <div>
              <label className="text-xs font-bold text-muted-foreground uppercase">Peso Ideal (kg)</label>
              <input type="number" value={guPeso} onChange={e => setGuPeso(e.target.value)} placeholder="Ej. 70" className="w-full mt-1 p-2 rounded-lg border border-border bg-background" />
            </div>
          </div>
          <button onClick={calcGastoUrinario} className="w-full py-2 bg-primary text-primary-foreground rounded-xl font-bold">Calcular</button>
          
          {guResult && (
            <div className="mt-4 p-4 bg-primary/10 rounded-xl border border-primary/20">
              <div className="text-center mb-2">
                <span className="text-2xl font-black text-primary">{guResult.value.toFixed(2)}</span>
                <span className="text-sm text-muted-foreground ml-1">ml/kg/hr</span>
              </div>
              <div className="text-center">
                <p className="font-bold text-sm">{guResult.class}</p>
                <p className="text-xs text-muted-foreground mt-1">{guResult.meaning}</p>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* 2. Peso Ideal */}
      <Card>
        <h3 className="text-xl font-bold mb-4 flex items-center"><Scale size={20} className="mr-2 text-primary" /> Peso Ideal</h3>
        <div className="space-y-4">
          <div className="bg-accent/30 p-4 rounded-xl">
            <p className="text-sm font-bold text-center">Fórmula de Devine (Adaptada a cm)</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-xs font-bold text-muted-foreground uppercase">Sexo</label>
              <select value={piSexo} onChange={e => setPiSexo(e.target.value as 'M' | 'F')} className="w-full mt-1 p-2 rounded-lg border border-border bg-background">
                <option value="M">Hombre</option>
                <option value="F">Mujer</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="text-xs font-bold text-muted-foreground uppercase">Altura (cm)</label>
              <input type="number" value={piAltura} onChange={e => setPiAltura(e.target.value)} placeholder="Ej. 170" className="w-full mt-1 p-2 rounded-lg border border-border bg-background" />
            </div>
          </div>
          <button onClick={calcPesoIdeal} className="w-full py-2 bg-primary text-primary-foreground rounded-xl font-bold">Calcular</button>
          
          {piResult !== null && (
            <div className="mt-4 p-4 bg-primary/10 rounded-xl border border-primary/20 text-center">
              <span className="text-2xl font-black text-primary">{piResult.toFixed(1)}</span>
              <span className="text-sm text-muted-foreground ml-1">kg</span>
            </div>
          )}
        </div>
      </Card>

      {/* 3. Pérdidas por O2 */}
      <Card>
        <h3 className="text-xl font-bold mb-4 flex items-center"><Wind size={20} className="mr-2 text-primary" /> Pérdidas por O2</h3>
        <div className="space-y-4">
          <div className="bg-accent/30 p-4 rounded-xl">
            <p className="text-sm font-bold text-center">Fórmula: Peso Ideal (kg) × Factor × Horas</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-xs font-bold text-muted-foreground uppercase">Dispositivo / Condición</label>
              <select value={o2Dispositivo} onChange={e => setO2Dispositivo(e.target.value)} className="w-full mt-1 p-2 rounded-lg border border-border bg-background text-sm">
                <option value="0.5">Estándar / Bajo flujo (&lt; 4 LPM)</option>
                <option value="0.7">Bajo flujo (&gt; 4 LPM sin humidificar)</option>
                <option value="1.0">Ventilación Mecánica (sin humidificar)</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-muted-foreground uppercase">Peso Ideal (kg)</label>
              <input type="number" value={o2Peso} onChange={e => setO2Peso(e.target.value)} placeholder="Ej. 70" className="w-full mt-1 p-2 rounded-lg border border-border bg-background" />
            </div>
            <div>
              <label className="text-xs font-bold text-muted-foreground uppercase">Tiempo (horas)</label>
              <input type="number" value={o2Horas} onChange={e => setO2Horas(e.target.value)} placeholder="Ej. 6" className="w-full mt-1 p-2 rounded-lg border border-border bg-background" />
            </div>
          </div>
          <button onClick={calcPerdidasO2} className="w-full py-2 bg-primary text-primary-foreground rounded-xl font-bold">Calcular</button>
          
          {o2Result !== null && (
            <div className="mt-4 p-4 bg-primary/10 rounded-xl border border-primary/20 text-center">
              <span className="text-2xl font-black text-primary">{o2Result.toFixed(0)}</span>
              <span className="text-sm text-muted-foreground ml-1">ml perdidos</span>
            </div>
          )}
        </div>
      </Card>

      {/* 4. Trastornos Ácido-Base */}
      <Card>
        <h3 className="text-xl font-bold mb-4 flex items-center"><Beaker size={20} className="mr-2 text-primary" /> Trastornos Ácido-Base</h3>
        <div className="space-y-4">
          <div className="bg-accent/30 p-4 rounded-xl">
            <p className="text-sm font-bold text-center">Fórmulas de Compensación (Winter, etc.)</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-xs font-bold text-muted-foreground uppercase">Trastorno Primario</label>
              <select value={abTipo} onChange={e => setAbTipo(e.target.value as any)} className="w-full mt-1 p-2 rounded-lg border border-border bg-background">
                <option value="acidosis_met">Acidosis Metabólica</option>
                <option value="alcalosis_met">Alcalosis Metabólica</option>
                <option value="acidosis_resp">Acidosis Respiratoria</option>
                <option value="alcalosis_resp">Alcalosis Respiratoria</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-muted-foreground uppercase">HCO3 medido</label>
              <input type="number" value={abHCO3} onChange={e => setAbHCO3(e.target.value)} placeholder="Ej. 14" className="w-full mt-1 p-2 rounded-lg border border-border bg-background" />
            </div>
            <div>
              <label className="text-xs font-bold text-muted-foreground uppercase">pCO2 medido</label>
              <input type="number" value={abPCO2} onChange={e => setAbPCO2(e.target.value)} placeholder="Ej. 30" className="w-full mt-1 p-2 rounded-lg border border-border bg-background" />
            </div>
          </div>
          <button onClick={calcAcidoBase} className="w-full py-2 bg-primary text-primary-foreground rounded-xl font-bold">Calcular Compensación</button>
          
          {abResult && (
            <div className="mt-4 p-4 bg-primary/10 rounded-xl border border-primary/20">
              <div className="text-center mb-2">
                <span className="text-sm text-muted-foreground">Esperado: </span>
                <span className="text-lg font-black text-primary">{abResult.expected}</span>
              </div>
              <div className="text-center">
                <p className="font-bold text-sm text-primary">{abResult.interpretation}</p>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* 5. Tensión Arterial Media */}
      <Card>
        <h3 className="text-xl font-bold mb-4 flex items-center"><Heart size={20} className="mr-2 text-primary" /> Tensión Arterial Media (TAM)</h3>
        <div className="space-y-4">
          <div className="bg-accent/30 p-4 rounded-xl">
            <p className="text-sm font-bold text-center">Fórmula: ((P.D × 2) + P.S) ÷ 3</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-muted-foreground uppercase">Presión Sistólica</label>
              <input type="number" value={tamSistolica} onChange={e => setTamSistolica(e.target.value)} placeholder="Ej. 120" className="w-full mt-1 p-2 rounded-lg border border-border bg-background" />
            </div>
            <div>
              <label className="text-xs font-bold text-muted-foreground uppercase">Presión Diastólica</label>
              <input type="number" value={tamDiastolica} onChange={e => setTamDiastolica(e.target.value)} placeholder="Ej. 80" className="w-full mt-1 p-2 rounded-lg border border-border bg-background" />
            </div>
          </div>
          <button onClick={calcTAM} className="w-full py-2 bg-primary text-primary-foreground rounded-xl font-bold">Calcular</button>
          
          {tamResult !== null && (
            <div className="mt-4 p-4 bg-primary/10 rounded-xl border border-primary/20 text-center">
              <span className="text-2xl font-black text-primary">{tamResult.toFixed(1)}</span>
              <span className="text-sm text-muted-foreground ml-1">mmHg</span>
            </div>
          )}
        </div>
      </Card>

      {/* 6. Cálculo de Goteo */}
      <Card>
        <h3 className="text-xl font-bold mb-4 flex items-center"><Droplet size={20} className="mr-2 text-primary" /> Cálculo de Goteo</h3>
        <div className="space-y-4">
          <div className="bg-accent/30 p-4 rounded-xl">
            <p className="text-sm font-bold text-center">Fórmula: (Volumen × Factor) / (Tiempo en horas × 60)</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-muted-foreground uppercase">Volumen (ml)</label>
              <input type="number" value={gotVolumen} onChange={e => setGotVolumen(e.target.value)} placeholder="Ej. 1000" className="w-full mt-1 p-2 rounded-lg border border-border bg-background" />
            </div>
            <div>
              <label className="text-xs font-bold text-muted-foreground uppercase">Tiempo (horas)</label>
              <input type="number" value={gotHoras} onChange={e => setGotHoras(e.target.value)} placeholder="Ej. 8" className="w-full mt-1 p-2 rounded-lg border border-border bg-background" />
            </div>
            <div className="col-span-2">
              <label className="text-xs font-bold text-muted-foreground uppercase">Factor (gtt/ml)</label>
              <select value={gotFactor} onChange={e => setGotFactor(e.target.value)} className="w-full mt-1 p-2 rounded-lg border border-border bg-background">
                <option value="20">Macrogotero (20 gtt/ml)</option>
                <option value="60">Microgotero (60 gtt/ml)</option>
                <option value="15">Normogotero (15 gtt/ml)</option>
              </select>
            </div>
          </div>
          <button onClick={calcGoteo} className="w-full py-2 bg-primary text-primary-foreground rounded-xl font-bold">Calcular</button>
          
          {gotResult !== null && (
            <div className="mt-4 p-4 bg-primary/10 rounded-xl border border-primary/20 text-center">
              <span className="text-2xl font-black text-primary">{gotResult.toFixed(1)}</span>
              <span className="text-sm text-muted-foreground ml-1">gotas/min</span>
            </div>
          )}
        </div>
      </Card>

      {/* 7. Índice de Masa Corporal (IMC) */}
      <Card>
        <h3 className="text-xl font-bold mb-4 flex items-center"><User size={20} className="mr-2 text-primary" /> Índice de Masa Corporal</h3>
        <div className="space-y-4">
          <div className="bg-accent/30 p-4 rounded-xl">
            <p className="text-sm font-bold text-center">Fórmula: Peso (kg) ÷ Altura (m)²</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-muted-foreground uppercase">Peso (kg)</label>
              <input type="number" value={imcPeso} onChange={e => setImcPeso(e.target.value)} placeholder="Ej. 70" className="w-full mt-1 p-2 rounded-lg border border-border bg-background" />
            </div>
            <div>
              <label className="text-xs font-bold text-muted-foreground uppercase">Altura (cm)</label>
              <input type="number" value={imcAltura} onChange={e => setImcAltura(e.target.value)} placeholder="Ej. 170" className="w-full mt-1 p-2 rounded-lg border border-border bg-background" />
            </div>
          </div>
          <button onClick={calcIMC} className="w-full py-2 bg-primary text-primary-foreground rounded-xl font-bold">Calcular</button>
          
          {imcResult && (
            <div className={`mt-4 p-4 rounded-xl border text-center ${
              imcResult.class === 'Normal' ? 'bg-green-500/10 border-green-500/20 text-green-700 dark:text-green-400' :
              imcResult.class === 'Bajo peso' ? 'bg-blue-500/10 border-blue-500/20 text-blue-700 dark:text-blue-400' :
              imcResult.class === 'Sobrepeso' ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-700 dark:text-yellow-400' :
              'bg-red-500/10 border-red-500/20 text-red-700 dark:text-red-400'
            }`}>
              <span className="text-2xl font-black">{imcResult.value.toFixed(1)}</span>
              <span className="text-sm ml-1 text-inherit opacity-80 font-medium">kg/m²</span>
              <p className="font-bold text-sm mt-1">{imcResult.class}</p>
            </div>
          )}
        </div>
      </Card>

      {/* 8. Dosis Pediátrica */}
      <Card className="md:col-span-2">
        <h3 className="text-xl font-bold mb-4 flex items-center"><Baby size={20} className="mr-2 text-primary" /> Dosis Pediátrica y Neonatal</h3>
        <div className="space-y-4">
          <div className="flex bg-accent/30 rounded-xl p-1 mb-4 w-fit mx-auto border border-border/50">
            <button 
              onClick={() => setPedTipo('bolo')} 
              className={`px-4 py-1.5 text-sm font-bold rounded-lg transition-all ${pedTipo === 'bolo' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Bolo / VO (ml)
            </button>
            <button 
              onClick={() => setPedTipo('infusion')} 
              className={`px-4 py-1.5 text-sm font-bold rounded-lg transition-all ${pedTipo === 'infusion' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Infusión (mcg/kg/min)
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 bg-accent/10 p-4 rounded-xl border border-border">
            <div>
              <label className="text-xs font-bold text-muted-foreground uppercase">Peso (kg)</label>
              <input type="number" value={pedPeso} onChange={e => setPedPeso(e.target.value)} placeholder="Ej. 12" className="w-full mt-1 p-2 rounded-lg border border-border bg-background" />
            </div>
            <div>
              <label className="text-[10px] font-bold text-muted-foreground uppercase leading-tight">Edad (años) <br/><span className="lowercase opacity-70">Opcional si no hay peso</span></label>
              <input type="number" value={pedEdad} onChange={e => setPedEdad(e.target.value)} placeholder="Ej. 2" className="w-full mt-1 p-2 rounded-lg border border-border bg-background" />
            </div>
            <div>
              <label className="text-[10px] font-bold text-muted-foreground uppercase leading-tight text-primary">Dosis <br/><span className="lowercase opacity-70">{pedTipo === 'bolo' ? 'x kg / dosis' : 'mcg / kg / min'}</span></label>
              <input type="number" value={pedDosis} onChange={e => setPedDosis(e.target.value)} placeholder={pedTipo === 'bolo' ? "Ej. 15 (mg/kg)" : "Ej. 5 (mcg)"} className="w-full mt-1 p-2 rounded-lg border border-primary/40 bg-background" />
            </div>
            <div>
              <label className="text-[10px] font-bold text-muted-foreground uppercase leading-tight text-orange-600">Presentación <br/><span className="lowercase opacity-70">{pedTipo === 'bolo' ? 'Masa (mg o mcg)' : 'Masa (mg)'}</span></label>
              <input type="number" value={pedMasa} onChange={e => setPedMasa(e.target.value)} placeholder="Ej. 250" className="w-full mt-1 p-2 rounded-lg border border-orange-500/40 bg-background" />
            </div>
            <div>
              <label className="text-[10px] font-bold text-muted-foreground uppercase leading-tight text-orange-600">Volumen <br/><span className="lowercase opacity-70">ml</span></label>
              <input type="number" value={pedVol} onChange={e => setPedVol(e.target.value)} placeholder="Ej. 5" className="w-full mt-1 p-2 rounded-lg border border-orange-500/40 bg-background" />
            </div>
          </div>
          
          <button onClick={calcPediatrica} className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-all">Calcular Medicación</button>
          
          {pedResult && (
            <div className="mt-4 p-4 bg-primary/10 rounded-xl border border-primary/20 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-4">
              <div>
                <span className="text-xs font-bold uppercase text-muted-foreground border-b border-muted-foreground/30 pb-0.5">{pedTipo === 'bolo' ? 'Volumen a administrar' : 'Velocidad BOMBA'}</span>
                <p className="text-3xl font-black text-primary mt-1 leading-none">{pedResult.value}</p>
              </div>
              <div className="bg-background/80 p-3 rounded-lg border border-border flex-1">
                <p className="text-xs text-muted-foreground">{pedResult.text}</p>
              </div>
            </div>
          )}
        </div>
      </Card>
        </div>
      </div>
    </div>
  );
}
