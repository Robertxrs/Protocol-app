import React, { useState, useEffect } from 'react';
import {
  CheckSquare,
  Calendar,
  Dumbbell,
  Edit3,
  Brain,
  Trash2,
  Plus,
  Settings,
  RotateCcw,
  Copy,
  Play,
  Pause,
  SkipForward,
  Minus,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

// --- ESTILOS CSS (Substituindo Tailwind) ---
const styles = `
  :root {
    --bg-app: #020617;
    --bg-panel: #0f172a;
    --bg-input: #1e293b;
    --border: #1e293b;
    --border-hover: #334155;
    --text-main: #e2e8f0;
    --text-muted: #64748b;
    --accent: #10b981; /* Emerald */
    --accent-dim: rgba(16, 185, 129, 0.1);
    --danger: #ef4444;
    --danger-dim: rgba(239, 68, 68, 0.1);
    --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  }

  * { box-sizing: border-box; }

  body {
    background-color: var(--bg-app);
    color: var(--text-main);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    margin: 0;
  }

  /* Layout Utilities */
  .app-container {
    max-width: 480px;
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: var(--bg-app);
    border-left: 1px solid var(--border);
    border-right: 1px solid var(--border);
    box-shadow: 0 0 20px rgba(0,0,0,0.5);
    position: relative;
  }

  .header {
    padding: 16px;
    border-bottom: 1px solid var(--border);
    background: rgba(2, 6, 23, 0.9);
    backdrop-filter: blur(4px);
    position: sticky;
    top: 0;
    z-index: 10;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .main-content {
    flex: 1;
    padding: 16px;
    overflow-y: auto;
  }

  .nav-bar {
    border-top: 1px solid var(--border);
    background: var(--bg-app);
    padding: 8px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 4px;
    position: sticky;
    bottom: 0;
    z-index: 10;
  }

  /* Components */
  .card {
    background-color: var(--bg-panel);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 16px;
  }
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    border-bottom: 1px solid var(--border);
    padding-bottom: 8px;
  }

  .stat-card {
    background-color: var(--bg-panel);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .row { display: flex; gap: 8px; align-items: center; }
  .row-between { display: flex; justify-content: space-between; align-items: center; }
  .col { display: flex; flex-direction: column; }
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

  .btn {
    background: var(--bg-input);
    color: var(--text-main);
    border: none;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    transition: background 0.2s;
  }
  .btn:hover { background: var(--border-hover); }
  .btn-sm { padding: 4px 8px; font-size: 12px; }
  .btn-icon { padding: 8px; border-radius: 50%; }
  
  .btn-primary { background: var(--accent-dim); color: var(--accent); border: 1px solid rgba(16, 185, 129, 0.2); }
  .btn-primary:hover { background: rgba(16, 185, 129, 0.2); }
  
  .btn-danger { background: var(--danger-dim); color: var(--danger); border: 1px solid rgba(239, 68, 68, 0.2); }
  
  .input-field {
    background: var(--bg-app);
    border: 1px solid var(--border);
    color: var(--text-main);
    padding: 8px;
    border-radius: 4px;
    width: 100%;
    font-size: 14px;
  }
  .input-field:focus { outline: 1px solid var(--accent); }

  .list-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.2s;
  }
  .list-item:hover { background: var(--bg-input); }
  .list-item.done .text-label { text-decoration: line-through; color: var(--text-muted); }
  .list-item.done .checkbox { background: var(--accent); border-color: var(--accent); }

  .checkbox {
    width: 20px;
    height: 20px;
    border: 2px solid var(--text-muted);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .scroll-h { display: flex; overflow-x: auto; gap: 8px; padding-bottom: 8px; }
  
  /* Typography */
  .title { font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; color: var(--text-main); margin: 0; }
  .subtitle { font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: var(--text-muted); font-family: var(--font-mono); }
  .text-lg { font-size: 18px; font-weight: 500; }
  .text-xl { font-size: 24px; font-weight: bold; }
  .text-4xl { font-size: 36px; font-weight: bold; line-height: 1; }
  .text-label { font-size: 14px; color: #cbd5e1; }
  .font-mono { font-family: var(--font-mono); }
  
  /* Utilities */
  .text-accent { color: var(--accent); }
  .text-muted { color: var(--text-muted); }
  .mt-2 { margin-top: 8px; }
  .mb-2 { margin-bottom: 8px; }
  .mb-4 { margin-bottom: 16px; }
  .w-full { width: 100%; }
  
  .timer-circle {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    border: 4px solid var(--bg-input);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 32px auto;
    background: var(--bg-panel);
    position: relative;
  }
  
  /* Custom Scrollbar */
  ::-webkit-scrollbar { width: 6px; height: 6px; }
  ::-webkit-scrollbar-track { background: var(--bg-app); }
  ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: var(--text-muted); }
`;

// --- DADOS PADRÃO (FALLBACK) ---

const DAYS = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

const generateId = () => Math.random().toString(36).substr(2, 9);

const BASE_ROUTINE = [
  { id: '1', time: '04:20', label: 'Acordar (Sem celular)', type: 'routine' },
  { id: '2', time: '04:30', label: 'Bloco de Estudo (50min)', type: 'focus' },
  { id: '3', time: '05:20', label: 'Treino (30min)', type: 'workout' },
  { id: '4', time: '05:50', label: 'Banho & Café', type: 'routine' },
  { id: '5', time: '09:00', label: 'Início Trabalho', type: 'work' },
  { id: '6', time: '18:00', label: 'Fim Trabalho', type: 'work' },
  { id: '7', time: '19:00', label: 'Jantar Leve', type: 'routine' },
  { id: '8', time: '20:00', label: 'Revisão/Leitura', type: 'study' },
  { id: '9', time: '21:30', label: 'Desligar Estímulos', type: 'routine' },
  { id: '10', time: '22:00', label: 'Dormir', type: 'sleep' },
];

const WEEKEND_ROUTINE = [
  { id: 'w1', time: '08:00', label: 'Acordar Naturalmente', type: 'routine' },
  { id: 'w2', time: '09:00', label: 'Café da Manhã', type: 'routine' },
  { id: 'w3', time: '10:00', label: 'Leitura / Estudo Livre', type: 'study' },
  { id: 'w4', time: '12:00', label: 'Almoço em Família', type: 'routine' },
  { id: 'w5', time: '14:00', label: 'Lazer / Descanso', type: 'routine' },
  { id: 'w6', time: '22:00', label: 'Dormir', type: 'sleep' },
];

const INITIAL_WEEKLY_SCHEDULE = DAYS.reduce((acc, day) => {
  const isWeekend = day === 'Sábado' || day === 'Domingo';
  acc[day] = (isWeekend ? WEEKEND_ROUTINE : BASE_ROUTINE).map(item => ({ ...item, id: generateId() }));
  return acc;
}, {});

const DEFAULT_THEMES = {
  'Segunda': { title: 'Mente & Disciplina', focus: 'Controle Interno', task: 'Escrever rotina ideal & Eliminar 1 hábito ruim.', module: 'habit-killer' },
  'Terça': { title: 'Aprender a Aprender', focus: 'Estudo Eficiente', task: 'Estudar 1 tema e explicar em voz alta (Feynman).', module: 'feynman' },
  'Quarta': { title: 'Corpo & Treino', focus: 'Fisiologia & Sono', task: 'Treino sem música & Anotar reação do corpo.', module: 'body-log' },
  'Quinta': { title: 'Economia & Dinheiro', focus: 'Longo Prazo', task: 'Classificar gastos: Necessidade vs Consumo.', module: 'expense-tracker' },
  'Sexta': { title: 'Estratégia de Vida', focus: 'Ajuste de Rota', task: 'Revisar a semana & Ajustar próxima.', module: 'weekly-review' },
  'Sábado': { title: 'Recuperação Ativa', focus: 'Manutenção', task: 'Organização do ambiente.', module: 'notes-only' },
  'Domingo': { title: 'Planejamento', focus: 'Preparo', task: 'Definir temas da semana.', module: 'notes-only' }
};

const DEFAULT_WORKOUTS_STRUCTURED = {
  'Segunda': {
    title: 'Bike: Cardio Constante',
    steps: [
      { id: '1', label: 'Aquecimento Leve', duration: 300 },
      { id: '2', label: 'Ritmo Constante', duration: 1200 },
      { id: '3', label: 'Desaquecimento', duration: 300 }
    ]
  },
  'Terça': {
    title: 'Corda: HIIT',
    steps: [
      { id: '1', label: 'Aquecimento', duration: 180 },
      { id: '2', label: 'Pular Corda', duration: 60 },
      { id: '3', label: 'Descanso', duration: 60 },
      { id: '4', label: 'Pular Corda', duration: 60 },
      { id: '5', label: 'Descanso', duration: 60 },
      { id: '6', label: 'Resfriamento', duration: 120 }
    ]
  },
  'Quarta': { title: 'Bike: Cardio Constante', steps: [{ id: '1', label: 'Completo', duration: 1800 }] },
  'Quinta': { title: 'Corda: Técnica', steps: [{ id: '1', label: 'Prática', duration: 900 }] },
  'Sexta': { title: 'Caminhada', steps: [{ id: '1', label: 'Livre', duration: 1800 }] },
  'Sábado': { title: 'Alongamento', steps: [{ id: '1', label: 'Rotina', duration: 1200 }] },
  'Domingo': { title: 'Descanso', steps: [] }
};

// --- COMPONENTES AUXILIARES (Estilizados com CSS Padrão) ---

const HabitKiller = () => {
  const [habit, setHabit] = useState('');
  const [trigger, setTrigger] = useState('');
  return (
    <div className="mb-4">
      <h3 className="subtitle mb-2" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '4px' }}>Eliminação de Hábito</h3>
      <div className="card">
        <label className="subtitle mb-2 block">Qual hábito automático você vai matar?</label>
        <input type="text" value={habit} onChange={(e) => setHabit(e.target.value)} placeholder="Ex: Abrir Instagram ao acordar" className="input-field mb-4" />
        <label className="subtitle mb-2 block">Qual é o gatilho dele?</label>
        <input type="text" value={trigger} onChange={(e) => setTrigger(e.target.value)} placeholder="Ex: Tocar o despertador" className="input-field" />
      </div>
    </div>
  );
};

const FeynmanTechnique = () => {
  return (
    <div className="mb-4">
      <h3 className="subtitle mb-2" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '4px' }}>Técnica Feynman</h3>
      <div className="card" style={{ height: '200px', display: 'flex', flexDirection: 'column' }}>
        <label className="subtitle mb-2 block">Explique o conceito para uma criança:</label>
        <textarea className="input-field" style={{ flex: 1, resize: 'none' }} placeholder="Comece aqui..."></textarea>
      </div>
    </div>
  );
};

const BodyLog = () => {
  return (
    <div className="mb-4">
      <h3 className="subtitle mb-2" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '4px' }}>Registro Fisiológico</h3>
      <div className="grid-2">
        <div className="card">
          <label className="subtitle mb-2 block">Sono (0-10)</label>
          <input type="number" className="input-field" />
        </div>
        <div className="card">
          <label className="subtitle mb-2 block">Energia (0-10)</label>
          <input type="number" className="input-field" />
        </div>
      </div>
    </div>
  );
};

const ExpenseTracker = () => {
  const [items, setItems] = useState([{ desc: '', type: 'need' }]);
  const addItem = () => setItems([...items, { desc: '', type: 'need' }]);
  return (
    <div className="mb-4">
      <h3 className="subtitle mb-2" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '4px' }}>Auditoria de Gastos</h3>
      <div className="card">
        {items.map((item, idx) => (
          <div key={idx} className="row mb-2">
            <input className="input-field" style={{ flex: 3 }} placeholder="Gasto..." />
            <select className="input-field" style={{ flex: 1 }}>
              <option value="need">Nec</option>
              <option value="want">Cons</option>
            </select>
          </div>
        ))}
        <button onClick={addItem} className="btn w-full" style={{ borderStyle: 'dashed', background: 'transparent' }}>+ Add</button>
      </div>
    </div>
  );
};

const WeeklyReview = () => {
  return (
    <div className="mb-4">
      <h3 className="subtitle mb-2" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '4px' }}>Revisão</h3>
      <div className="col" style={{ gap: '8px' }}>
        <div className="card">
          <label className="subtitle mb-2 block">O que funcionou?</label>
          <input className="input-field" placeholder="..." style={{ background: 'transparent', border: 'none', padding: 0 }} />
        </div>
        <div className="card">
          <label className="subtitle mb-2 block">O que falhou?</label>
          <input className="input-field" placeholder="..." style={{ background: 'transparent', border: 'none', padding: 0 }} />
        </div>
      </div>
    </div>
  );
};

// --- APP PRINCIPAL ---

export default function AppNoTailwind() {
  const [weeklySchedule, setWeeklySchedule] = useState(() => {
    const saved = localStorage.getItem('ad_weekly_schedule');
    return saved ? JSON.parse(saved) : INITIAL_WEEKLY_SCHEDULE;
  });

  const [themes, setThemes] = useState(() => {
    const saved = localStorage.getItem('ad_themes');
    return saved ? JSON.parse(saved) : DEFAULT_THEMES;
  });

  const [workouts, setWorkouts] = useState(() => {
    const saved = localStorage.getItem('ad_workouts_structured');
    let data = saved ? JSON.parse(saved) : DEFAULT_WORKOUTS_STRUCTURED;
    const keys = Object.keys(data);
    if (keys.length > 0 && typeof data[keys[0]] === 'string') return DEFAULT_WORKOUTS_STRUCTURED;
    return data;
  });

  const [notes, setNotes] = useState(() => localStorage.getItem('ad_notes') || '');
  const [streak, setStreak] = useState(() => parseInt(localStorage.getItem('ad_streak') || '0'));
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [selectedDayIndex, setSelectedDayIndex] = useState(new Date().getDay());
  const [configDay, setConfigDay] = useState(DAYS[new Date().getDay()]);
  const [timeLeft, setTimeLeft] = useState(50 * 60);
  const [timerActive, setTimerActive] = useState(false);
  const [completedTasks, setCompletedTasks] = useState({});

  useEffect(() => localStorage.setItem('ad_weekly_schedule', JSON.stringify(weeklySchedule)), [weeklySchedule]);
  useEffect(() => localStorage.setItem('ad_themes', JSON.stringify(themes)), [themes]);
  useEffect(() => localStorage.setItem('ad_workouts_structured', JSON.stringify(workouts)), [workouts]);
  useEffect(() => localStorage.setItem('ad_notes', notes), [notes]);
  useEffect(() => localStorage.setItem('ad_streak', streak.toString()), [streak]);

  const currentDayName = DAYS[selectedDayIndex];
  const themeData = themes[currentDayName];
  const currentWorkout = workouts[currentDayName];
  const dailyRoutine = weeklySchedule[currentDayName] || [];

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    let interval = null;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0) {
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  // CRUD Functions
  const handleScheduleChange = (dayName, id, field, value) => {
    setWeeklySchedule(prev => ({
      ...prev,
      [dayName]: prev[dayName].map(item => item.id === id ? { ...item, [field]: value } : item)
    }));
  };

  const addScheduleItem = (dayName) => {
    setWeeklySchedule(prev => ({
      ...prev,
      [dayName]: [...prev[dayName], { id: generateId(), time: '00:00', label: 'Nova Tarefa', type: 'routine' }].sort((a, b) => a.time.localeCompare(b.time))
    }));
  };

  const deleteScheduleItem = (dayName, id) => {
    setWeeklySchedule(prev => ({
      ...prev,
      [dayName]: prev[dayName].filter(item => item.id !== id)
    }));
  };

  const copyRoutineToAllDays = (sourceDay) => {
    if (!confirm(`Copiar rotina de ${sourceDay} para TODOS os dias?`)) return;
    const sourceRoutine = weeklySchedule[sourceDay];
    const newWeeklySchedule = {};
    DAYS.forEach(d => { newWeeklySchedule[d] = sourceRoutine.map(item => ({ ...item, id: generateId() })); });
    setWeeklySchedule(newWeeklySchedule);
  };

  const handleThemeChange = (day, field, value) => {
    setThemes(prev => ({ ...prev, [day]: { ...prev[day], [field]: value } }));
  };

  const updateWorkoutTitle = (day, title) => {
    setWorkouts(prev => ({ ...prev, [day]: { ...prev[day], title } }));
  };

  const updateWorkoutStep = (day, stepId, field, value) => {
    setWorkouts(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        steps: prev[day].steps.map(s => s.id === stepId ? { ...s, [field]: value } : s)
      }
    }));
  };

  const addWorkoutStep = (day) => {
    setWorkouts(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        steps: [...prev[day].steps, { id: generateId(), label: 'Novo Passo', duration: 60 }]
      }
    }));
  };

  const removeWorkoutStep = (day, stepId) => {
    setWorkouts(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        steps: prev[day].steps.filter(s => s.id !== stepId)
      }
    }));
  };

  const resetAll = () => {
    if (confirm('Isso apagará todas as edições. Resetar tudo?')) {
      setWeeklySchedule(INITIAL_WEEKLY_SCHEDULE);
      setThemes(DEFAULT_THEMES);
      setWorkouts(DEFAULT_WORKOUTS_STRUCTURED);
      setNotes('');
      setStreak(0);
    }
  }

  // --- SUB-VIEWS ---

  const WorkoutPlayer = () => {
    const workout = workouts[currentDayName];
    const [stepIndex, setStepIndex] = useState(0);
    const [timer, setTimer] = useState(workout?.steps[0]?.duration || 0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
      setStepIndex(0);
      setTimer(workout?.steps[0]?.duration || 0);
      setIsRunning(false);
    }, [currentDayName, workout]);

    useEffect(() => {
      let interval = null;
      if (isRunning && timer > 0) {
        interval = setInterval(() => setTimer(t => t - 1), 1000);
      } else if (timer === 0 && isRunning) {
        setIsRunning(false);
      }
      return () => clearInterval(interval);
    }, [isRunning, timer]);

    const handleNextStep = () => {
      if (stepIndex < (workout?.steps.length || 0) - 1) {
        const next = stepIndex + 1;
        setStepIndex(next);
        setTimer(workout.steps[next].duration);
        setIsRunning(false);
      }
    };

    const handlePrevStep = () => {
      if (stepIndex > 0) {
        const prev = stepIndex - 1;
        setStepIndex(prev);
        setTimer(workout.steps[prev].duration);
        setIsRunning(false);
      }
    };

    const adjustTime = (seconds) => {
      setTimer(prev => Math.max(0, prev + seconds));
    };

    if (!workout || !workout.steps || workout.steps.length === 0) {
      return (
        <div className="col" style={{ alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)' }}>
          <Dumbbell size={48} style={{ opacity: 0.2, marginBottom: '16px' }} />
          <p>Sem treino configurado para hoje.</p>
          <button onClick={() => setCurrentTab('config')} className="btn btn-primary mt-2">Configurar agora</button>
        </div>
      );
    }

    const currentStep = workout.steps[stepIndex];
    return (
      <div className="col" style={{ height: '100%', paddingBottom: '40px' }}>
        <div className="card-header">
          <div>
            <h2 className="text-xl">{workout.title}</h2>
            <p className="subtitle">{currentDayName}</p>
          </div>
          <span className="subtitle" style={{ background: 'var(--bg-input)', padding: '4px 8px', borderRadius: '4px' }}>
            Passo {stepIndex + 1} / {workout.steps.length}
          </span>
        </div>

        <div className="timer-circle">
          <span className="text-4xl font-mono">{formatTime(timer)}</span>
          <span className="subtitle text-accent mt-2">{currentStep?.label}</span>
        </div>

        <div className="card" style={{ background: 'rgba(15, 23, 42, 0.5)' }}>
          <div className="row" style={{ justifyContent: 'center', gap: '24px', marginBottom: '24px' }}>
            <button onClick={() => adjustTime(-60)} className="btn btn-icon"><Minus size={20} /></button>
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="btn btn-icon"
              style={{ width: '64px', height: '64px', background: isRunning ? 'rgba(245, 158, 11, 0.2)' : 'var(--accent)', color: isRunning ? '#f59e0b' : 'var(--bg-app)' }}
            >
              {isRunning ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" style={{ marginLeft: '4px' }} />}
            </button>
            <button onClick={() => adjustTime(60)} className="btn btn-icon"><Plus size={20} /></button>
          </div>

          <div className="row-between">
            <button onClick={handlePrevStep} disabled={stepIndex === 0} className="btn" style={{ background: 'transparent', opacity: stepIndex === 0 ? 0.3 : 1 }}>
              <RotateCcw size={14} /> Anterior
            </button>
            <button onClick={handleNextStep} disabled={stepIndex === workout.steps.length - 1} className="btn">
              Próximo <SkipForward size={14} />
            </button>
          </div>
        </div>

        <div className="col" style={{ gap: '8px' }}>
          <h4 className="subtitle">Cronograma</h4>
          {workout.steps.map((s, idx) => (
            <div
              key={s.id}
              className="row-between"
              style={{
                padding: '12px',
                borderRadius: '6px',
                fontSize: '14px',
                background: idx === stepIndex ? 'var(--accent-dim)' : 'rgba(30, 41, 59, 0.5)',
                color: idx === stepIndex ? 'var(--accent)' : 'var(--text-muted)',
                border: idx === stepIndex ? '1px solid rgba(16, 185, 129, 0.3)' : 'none'
              }}
            >
              <div className="row">
                <span className="font-mono" style={{ opacity: 0.5 }}>{idx + 1}</span>
                <span>{s.label}</span>
              </div>
              <span className="font-mono" style={{ opacity: 0.7 }}>{Math.floor(s.duration / 60)} min</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderConfig = () => (
    <div style={{ paddingBottom: '40px' }}>
      <div className="card-header">
        <h2 className="text-xl">Configuração</h2>
        <button onClick={resetAll} className="btn btn-danger btn-sm">
          <RotateCcw size={12} /> Reset
        </button>
      </div>

      <div className="scroll-h" style={{ marginBottom: '16px', position: 'sticky', top: '70px', background: 'var(--bg-app)', padding: '8px 0', zIndex: 5 }}>
        {DAYS.map(day => (
          <button
            key={day}
            onClick={() => setConfigDay(day)}
            className="btn btn-sm"
            style={{
              background: configDay === day ? 'var(--accent-dim)' : 'var(--bg-input)',
              color: configDay === day ? 'var(--accent)' : 'var(--text-muted)',
              borderColor: configDay === day ? 'var(--accent)' : 'transparent',
              borderWidth: '1px',
              borderStyle: 'solid'
            }}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Treino Editor */}
      <div className="mb-4">
        <h3 className="subtitle mb-2 flex items-center gap-2"> <Dumbbell size={14} /> Editor de Treino: {configDay} </h3>
        <div className="card">
          <div className="mb-4">
            <label className="subtitle mb-1 block">Título</label>
            <input
              className="input-field"
              value={workouts[configDay]?.title || ''}
              onChange={(e) => updateWorkoutTitle(configDay, e.target.value)}
            />
          </div>

          <div className="col mb-4" style={{ gap: '8px' }}>
            <label className="subtitle block">Passos</label>
            {workouts[configDay]?.steps.map((step) => (
              <div key={step.id} className="row" style={{ background: 'var(--bg-app)', padding: '8px', borderRadius: '4px', border: '1px solid var(--border)' }}>
                <div className="font-mono text-muted text-sm" style={{ padding: '4px', background: 'var(--bg-input)', borderRadius: '4px' }}>
                  {Math.floor(step.duration / 60)}m
                </div>
                <div className="col" style={{ gap: '2px' }}>
                  <button onClick={() => updateWorkoutStep(configDay, step.id, 'duration', step.duration + 60)} className="btn btn-sm" style={{ padding: '2px' }}><ChevronUp size={10} /></button>
                  <button onClick={() => updateWorkoutStep(configDay, step.id, 'duration', Math.max(0, step.duration - 60))} className="btn btn-sm" style={{ padding: '2px' }}><ChevronDown size={10} /></button>
                </div>
                <input
                  className="input-field"
                  style={{ border: 'none', background: 'transparent' }}
                  value={step.label}
                  onChange={(e) => updateWorkoutStep(configDay, step.id, 'label', e.target.value)}
                />
                <button onClick={() => removeWorkoutStep(configDay, step.id)} className="btn btn-icon btn-sm" style={{ color: 'var(--danger)' }}><Trash2 size={14} /></button>
              </div>
            ))}
          </div>

          <button onClick={() => addWorkoutStep(configDay)} className="btn btn-primary w-full btn-sm">
            <Plus size={14} /> Adicionar Passo
          </button>
        </div>
      </div>

      {/* Rotina Editor */}
      <div>
        <div className="row-between mb-4">
          <h3 className="subtitle">Rotina: {configDay}</h3>
          <div className="row">
            <button onClick={() => copyRoutineToAllDays(configDay)} className="btn btn-sm">
              <Copy size={10} /> Copiar Todos
            </button>
            <button onClick={() => addScheduleItem(configDay)} className="btn btn-sm">
              <Plus size={10} /> Add
            </button>
          </div>
        </div>

        <div className="col" style={{ gap: '4px' }}>
          {weeklySchedule[configDay]?.map((item) => (
            <div key={item.id} className="row" style={{ background: 'var(--bg-panel)', padding: '8px', borderRadius: '4px', border: '1px solid var(--border)' }}>
              <input
                type="time"
                value={item.time}
                onChange={(e) => handleScheduleChange(configDay, item.id, 'time', e.target.value)}
                className="input-field font-mono"
                style={{ width: '80px', background: 'transparent', border: 'none' }}
              />
              <input
                type="text"
                value={item.label}
                onChange={(e) => handleScheduleChange(configDay, item.id, 'label', e.target.value)}
                className="input-field"
                style={{ flex: 1, background: 'transparent', border: 'none' }}
              />
              <button onClick={() => deleteScheduleItem(configDay, item.id)} className="btn btn-icon btn-sm" style={{ color: 'var(--text-muted)' }}>
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="col" style={{ gap: '24px' }}>
      <div className="grid-2">
        <div className="stat-card">
          <span className="subtitle">Streak</span>
          <div className="row" style={{ alignItems: 'baseline' }}>
            <span className="text-4xl">{streak}</span>
            <span className="text-muted text-sm">dias</span>
          </div>
          <div className="row mt-2">
            <button onClick={() => setStreak(s => s + 1)} className="btn btn-sm" style={{ flex: 1 }}>+</button>
            <button onClick={() => setStreak(s => Math.max(0, s - 1))} className="btn btn-sm" style={{ flex: 1 }}>-</button>
          </div>
        </div>

        <div className="stat-card">
          <span className="subtitle">Foco Rápido</span>
          <span className="text-4xl font-mono">{formatTime(timeLeft)}</span>
          <button
            onClick={() => setTimerActive(!timerActive)}
            className={timerActive ? 'btn btn-danger btn-sm mt-2' : 'btn btn-primary btn-sm mt-2'}
          >
            {timerActive ? 'Pausar' : 'Iniciar'}
          </button>
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="card-header" style={{ background: 'var(--bg-input)', padding: '12px 16px', borderBottom: '1px solid var(--border)' }}>
          <div className="row">
            <Brain size={16} className="text-muted" />
            <span className="title" style={{ fontSize: '12px' }}>{currentDayName}</span>
          </div>
          <span className="subtitle" style={{ background: 'var(--bg-app)', padding: '2px 6px', borderRadius: '4px' }}>{themeData?.focus}</span>
        </div>
        <div style={{ padding: '20px' }}>
          <h4 className="subtitle mb-2">Tema</h4>
          <p className="text-lg mb-4">{themeData?.title}</p>

          <h4 className="subtitle mb-2">Tarefa Crítica</h4>
          <p className="text-sm mb-4" style={{ borderLeft: '2px solid var(--accent)', paddingLeft: '12px', color: 'var(--text-main)' }}>{themeData?.task}</p>

          <div
            onClick={() => setCurrentTab('workout')}
            className="card row-between"
            style={{ marginBottom: 0, cursor: 'pointer', border: '1px solid var(--border-hover)' }}
          >
            <div className="row">
              <Dumbbell size={16} className="text-muted" />
              <div>
                <h4 className="subtitle">Treino</h4>
                <p className="text-sm">{currentWorkout?.title || 'Descanso'}</p>
              </div>
            </div>
            <Play size={14} className="text-muted" />
          </div>
        </div>
      </div>

      {themeData?.module === 'habit-killer' && <HabitKiller />}
      {themeData?.module === 'feynman' && <FeynmanTechnique />}
      {themeData?.module === 'body-log' && <BodyLog />}
      {themeData?.module === 'expense-tracker' && <ExpenseTracker />}
      {themeData?.module === 'weekly-review' && <WeeklyReview />}

      <div style={{ paddingBottom: '32px' }}>
        <h3 className="subtitle mb-4" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>Rotina</h3>
        <div className="col" style={{ gap: '4px' }}>
          {dailyRoutine.map((item) => {
            const key = `${new Date().toDateString()}-${item.id}`;
            const isDone = completedTasks[key];
            return (
              <div
                key={item.id}
                onClick={() => setCompletedTasks(prev => ({ ...prev, [key]: !isDone }))}
                className={`list-item ${isDone ? 'done' : ''}`}
              >
                <div className="checkbox">
                  {isDone && <div style={{ width: '10px', height: '10px', background: '#020617' }} />}
                </div>
                <span className="font-mono text-muted" style={{ width: '40px', fontSize: '12px' }}>{item.time}</span>
                <span className="text-label">{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderCalendar = () => (
    <div className="col" style={{ gap: '12px' }}>
      <h2 className="text-lg">Semana</h2>
      {DAYS.map((d, idx) => {
        const isToday = idx === new Date().getDay();
        const t = themes[d];
        const w = workouts[d];
        return (
          <div
            key={d}
            onClick={() => { setSelectedDayIndex(idx); setCurrentTab('dashboard'); }}
            className="card"
            style={{
              marginBottom: 0,
              borderColor: isToday ? 'var(--accent)' : 'var(--border)',
              cursor: 'pointer'
            }}
          >
            <div className="row-between mb-2">
              <span className="subtitle" style={{ color: isToday ? 'var(--accent)' : 'var(--text-muted)' }}>{d}</span>
              {w?.title && <span className="subtitle row" style={{ gap: '4px', background: 'var(--bg-app)', padding: '2px 6px', borderRadius: '4px' }}><Dumbbell size={10} /> {w.title}</span>}
            </div>
            <div className="text-sm font-medium">{t.title}</div>
          </div>
        );
      })}
    </div>
  );

  const renderNotes = () => (
    <div className="col" style={{ height: '100%' }}>
      <textarea
        className="input-field"
        style={{ flex: 1, resize: 'none', background: 'var(--bg-panel)', lineHeight: '1.6' }}
        placeholder="Bloco de Ideias..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
    </div>
  );

  return (
    <>
      <style>{styles}</style>
      <div className="app-container">

        <header className="header">
          <div>
            <h1 className="title">Protocolo</h1>
          </div>
          <button
            onClick={() => setCurrentTab('config')}
            className="btn btn-icon"
            style={{ background: currentTab === 'config' ? 'var(--bg-input)' : 'transparent' }}
          >
            <Settings size={18} />
          </button>
        </header>

        <main className="main-content">
          {currentTab === 'dashboard' && renderDashboard()}
          {currentTab === 'calendar' && renderCalendar()}
          {currentTab === 'workout' && <WorkoutPlayer />}
          {currentTab === 'notes' && renderNotes()}
          {currentTab === 'config' && renderConfig()}
        </main>

        <nav className="nav-bar">
          <button onClick={() => setCurrentTab('dashboard')} className="btn col" style={{ background: 'transparent', color: currentTab === 'dashboard' ? 'var(--accent)' : 'var(--text-muted)', gap: '4px' }}>
            <CheckSquare size={18} />
            <span className="subtitle" style={{ fontSize: '9px', color: 'currentColor' }}>Hoje</span>
          </button>
          <button onClick={() => setCurrentTab('workout')} className="btn col" style={{ background: 'transparent', color: currentTab === 'workout' ? '#f59e0b' : 'var(--text-muted)', gap: '4px' }}>
            <Dumbbell size={18} />
            <span className="subtitle" style={{ fontSize: '9px', color: 'currentColor' }}>Treino</span>
          </button>
          <button onClick={() => setCurrentTab('calendar')} className="btn col" style={{ background: 'transparent', color: currentTab === 'calendar' ? '#3b82f6' : 'var(--text-muted)', gap: '4px' }}>
            <Calendar size={18} />
            <span className="subtitle" style={{ fontSize: '9px', color: 'currentColor' }}>Semana</span>
          </button>
          <button onClick={() => setCurrentTab('notes')} className="btn col" style={{ background: 'transparent', color: currentTab === 'notes' ? '#a855f7' : 'var(--text-muted)', gap: '4px' }}>
            <Edit3 size={18} />
            <span className="subtitle" style={{ fontSize: '9px', color: 'currentColor' }}>Notas</span>
          </button>
        </nav>

      </div>
    </>
  );
}