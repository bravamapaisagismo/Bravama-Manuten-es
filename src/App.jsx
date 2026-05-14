import { useState, useRef } from "react";

// ─── DESIGN TOKENS — Apple DNA ─────────────────────────────────────────────────
const C = {
  bg: "#ffffff",
  bgSecondary: "#f5f5f7",
  bgTertiary: "#e8e8ed",
  border: "#d2d2d7",
  borderLight: "#f0f0f5",
  green: "#1e6b3a",
  greenApple: "#34c759",
  greenLight: "#f0faf4",
  amber: "#c8852a",
  amberLight: "#fff8f0",
  red: "#ff3b30",
  redLight: "#fff5f4",
  blue: "#0071e3",
  text: "#1d1d1f",
  textMid: "#424245",
  textMuted: "#6e6e73",
  textPlaceholder: "#aeaeb2",
  white: "#ffffff",
};

// ─── CLIENTES ─────────────────────────────────────────────────────────────────
const CLIENTES = [
  { id: 1,  nome: "Joaquim",          bairro: "Lagoa",      frequencia: 30, colaboradores: ["Erich"] },
  { id: 2,  nome: "Ed. Dona Mariana", bairro: "Botafogo",   frequencia: 30, colaboradores: ["Erich","Werlley"] },
  { id: 3,  nome: "Nicolas",          bairro: "Barra",      frequencia: 30, colaboradores: ["Erich"] },
  { id: 4,  nome: "João Trechau",     bairro: "Flamengo",   frequencia: 45, colaboradores: ["Erich"] },
  { id: 5,  nome: "Luís Flaks",       bairro: "Leblon",     frequencia: 10, colaboradores: ["Erich","Werlley"] },
  { id: 6,  nome: "FCDG",             bairro: "Centro",     frequencia: 14, colaboradores: ["Édson","Erich"] },
  { id: 7,  nome: "Lucas Arruda",     bairro: "Lagoa",      frequencia: 30, colaboradores: ["Erich"] },
  { id: 8,  nome: "Gustavo",          bairro: "Lagoa",      frequencia: 30, colaboradores: ["Erich"] },
  { id: 9,  nome: "André",            bairro: "Barra",      frequencia: 30, colaboradores: ["Erich"] },
  { id: 10, nome: "João Francisco",   bairro: "Copacabana", frequencia: 30, colaboradores: ["Erich","Werlley"] },
  { id: 11, nome: "Miguel",           bairro: "Ipanema",    frequencia: 30, colaboradores: ["Erich"] },
  { id: 12, nome: "Karina",           bairro: "Ipanema",    frequencia: 52, colaboradores: ["Erich"] },
  { id: 13, nome: "Zerezes",          bairro: "Ipanema",    frequencia: 15, colaboradores: ["Werlley","Erich"], endereco: "Rua Garcia Dávila 115" },
];

const FUNCIONARIOS = [
  { id: 1, nome: "Erich",   iniciais: "ER", cor: C.green },
  { id: 2, nome: "Werlley", iniciais: "WE", cor: "#0071e3" },
  { id: 3, nome: "Édson",   iniciais: "ED", cor: "#8944ab" },
];

// ─── SEÇÕES OPCIONAIS ─────────────────────────────────────────────────────────
const SECOES_OPCIONAIS = [
  {
    id: "jardim_vertical", label: "Jardim Vertical", icone: "🌿",
    itens: [
      { id: "jv_irrig_ok",       label: "Irrigação funcionando corretamente",    grupo: "Irrigação",      critico: false },
      { id: "jv_irrig_ajuste",   label: "Ajuste realizado no sistema",           grupo: "Irrigação",      critico: false },
      { id: "jv_reservatorio",   label: "Nível do reservatório verificado",      grupo: "Irrigação",      critico: false },
      { id: "jv_peca_trocar",    label: "Peça para substituir",                  grupo: "Irrigação",      critico: true  },
      { id: "jv_qual_peca",      label: "Qual peça / detalhe",                   grupo: "Irrigação",      tipo: "texto"  },
      { id: "jv_poda",           label: "Poda e aparagem realizadas",            grupo: "Plantas",        critico: false },
      { id: "jv_limpeza_folhas", label: "Limpeza de folhas secas e detritos",    grupo: "Plantas",        critico: false },
      { id: "jv_estado_geral",   label: "Estado geral das plantas",              grupo: "Plantas",        critico: false },
      { id: "jv_reposicao",      label: "Reposição de planta necessária",        grupo: "Plantas",        critico: true  },
      { id: "jv_qual_planta",    label: "Qual(is) planta(s) repor",              grupo: "Plantas",        tipo: "texto"  },
      { id: "jv_adubacao",       label: "Adubação realizada",                    grupo: "Nutrição",       critico: false },
      { id: "jv_tipo_adubo",     label: "Tipo e dosagem aplicados",              grupo: "Nutrição",       tipo: "texto"  },
      { id: "jv_deficiencia",    label: "Sintoma de deficiência nutricional",    grupo: "Nutrição",       critico: true  },
      { id: "jv_praga",          label: "Observação de praga",                   grupo: "Fitossanidade",  critico: true  },
      { id: "jv_doenca",         label: "Sintoma de doença / fungo",             grupo: "Fitossanidade",  critico: true  },
      { id: "jv_defensivo",      label: "Aplicação de defensivo realizada",      grupo: "Fitossanidade",  critico: false },
      { id: "jv_qual_defensivo", label: "Produto e dosagem aplicados",           grupo: "Fitossanidade",  tipo: "texto"  },
      { id: "jv_estrutura_ok",   label: "Estrutura e fixações íntegras",         grupo: "Estrutura",      critico: false },
      { id: "jv_vazamento",      label: "Vazamento identificado",                grupo: "Estrutura",      critico: true  },
      { id: "jv_obs_estrutura",  label: "Obs. sobre estrutura",                  grupo: "Estrutura",      tipo: "texto"  },
    ],
  },
  {
    id: "canteiro", label: "Canteiro", icone: "🌱",
    itens: [
      { id: "ct_poda",           label: "Poda e corte realizados",               grupo: "Manutenção",     critico: false },
      { id: "ct_limpeza",        label: "Limpeza e capina realizadas",           grupo: "Manutenção",     critico: false },
      { id: "ct_bordas",         label: "Bordas e delimitações ajustadas",       grupo: "Manutenção",     critico: false },
      { id: "ct_estado_geral",   label: "Estado geral das plantas",              grupo: "Plantas",        critico: false },
      { id: "ct_reposicao",      label: "Reposição de planta necessária",        grupo: "Plantas",        critico: true  },
      { id: "ct_qual_planta",    label: "Qual(is) planta(s) repor",              grupo: "Plantas",        tipo: "texto"  },
      { id: "ct_adubacao",       label: "Adubação realizada",                    grupo: "Nutrição",       critico: false },
      { id: "ct_tipo_adubo",     label: "Tipo e dosagem aplicados",              grupo: "Nutrição",       tipo: "texto"  },
      { id: "ct_substrato",      label: "Correção de substrato realizada",       grupo: "Nutrição",       critico: false },
      { id: "ct_deficiencia",    label: "Sintoma de deficiência nutricional",    grupo: "Nutrição",       critico: true  },
      { id: "ct_irrigacao_ok",   label: "Irrigação verificada",                  grupo: "Irrigação",      critico: false },
      { id: "ct_irrig_ajuste",   label: "Ajuste realizado",                      grupo: "Irrigação",      critico: false },
      { id: "ct_peca_trocar",    label: "Peça para substituir",                  grupo: "Irrigação",      critico: true  },
      { id: "ct_qual_peca",      label: "Qual peça / detalhe",                   grupo: "Irrigação",      tipo: "texto"  },
      { id: "ct_praga",          label: "Observação de praga",                   grupo: "Fitossanidade",  critico: true  },
      { id: "ct_doenca",         label: "Sintoma de doença / fungo",             grupo: "Fitossanidade",  critico: true  },
      { id: "ct_defensivo",      label: "Aplicação de defensivo realizada",      grupo: "Fitossanidade",  critico: false },
      { id: "ct_qual_defensivo", label: "Produto e dosagem aplicados",           grupo: "Fitossanidade",  tipo: "texto"  },
    ],
  },
  {
    id: "vasos", label: "Vasos", icone: "🪴",
    itens: [
      { id: "vs_estado_geral",   label: "Estado geral dos vasos e plantas",      grupo: "Geral",          critico: false },
      { id: "vs_limpeza",        label: "Limpeza e organização realizadas",      grupo: "Geral",          critico: false },
      { id: "vs_rega",           label: "Rega realizada",                        grupo: "Irrigação",      critico: false },
      { id: "vs_drenagem",       label: "Drenagem funcionando corretamente",     grupo: "Irrigação",      critico: false },
      { id: "vs_adubacao",       label: "Adubação realizada",                    grupo: "Nutrição",       critico: false },
      { id: "vs_tipo_adubo",     label: "Tipo e dosagem aplicados",              grupo: "Nutrição",       tipo: "texto"  },
      { id: "vs_substrato",      label: "Troca ou correção de substrato",        grupo: "Nutrição",       critico: false },
      { id: "vs_deficiencia",    label: "Sintoma de deficiência nutricional",    grupo: "Nutrição",       critico: true  },
      { id: "vs_poda",           label: "Poda e limpeza de folhas secas",        grupo: "Plantas",        critico: false },
      { id: "vs_reposicao",      label: "Reposição de planta necessária",        grupo: "Plantas",        critico: true  },
      { id: "vs_qual_planta",    label: "Qual(is) planta(s) repor",              grupo: "Plantas",        tipo: "texto"  },
      { id: "vs_vaso_trocar",    label: "Vaso danificado / a substituir",        grupo: "Plantas",        critico: true  },
      { id: "vs_qual_vaso",      label: "Qual vaso substituir",                  grupo: "Plantas",        tipo: "texto"  },
      { id: "vs_praga",          label: "Observação de praga",                   grupo: "Fitossanidade",  critico: true  },
      { id: "vs_doenca",         label: "Sintoma de doença / fungo",             grupo: "Fitossanidade",  critico: true  },
      { id: "vs_defensivo",      label: "Aplicação de defensivo realizada",      grupo: "Fitossanidade",  critico: false },
      { id: "vs_qual_defensivo", label: "Produto e dosagem aplicados",           grupo: "Fitossanidade",  tipo: "texto"  },
    ],
  },
  {
    id: "jardineiras", label: "Jardineiras", icone: "🌸",
    itens: [
      { id: "jr_estado_geral",   label: "Estado geral das jardineiras",          grupo: "Geral",          critico: false },
      { id: "jr_limpeza",        label: "Limpeza e organização realizadas",      grupo: "Geral",          critico: false },
      { id: "jr_poda",           label: "Poda e aparagem realizadas",            grupo: "Plantas",        critico: false },
      { id: "jr_reposicao",      label: "Reposição de planta necessária",        grupo: "Plantas",        critico: true  },
      { id: "jr_qual_planta",    label: "Qual(is) planta(s) repor",              grupo: "Plantas",        tipo: "texto"  },
      { id: "jr_jardineira_ok",  label: "Estrutura da jardineira íntegra",       grupo: "Estrutura",      critico: false },
      { id: "jr_jardineira_dan", label: "Jardineira danificada / a substituir",  grupo: "Estrutura",      critico: true  },
      { id: "jr_qual_jardineira",label: "Qual jardineira substituir",            grupo: "Estrutura",      tipo: "texto"  },
      { id: "jr_irrigacao_ok",   label: "Irrigação / rega verificada",           grupo: "Irrigação",      critico: false },
      { id: "jr_drenagem",       label: "Drenagem funcionando corretamente",     grupo: "Irrigação",      critico: false },
      { id: "jr_peca_trocar",    label: "Peça de irrigação a substituir",        grupo: "Irrigação",      critico: true  },
      { id: "jr_qual_peca",      label: "Qual peça / detalhe",                   grupo: "Irrigação",      tipo: "texto"  },
      { id: "jr_adubacao",       label: "Adubação realizada",                    grupo: "Nutrição",       critico: false },
      { id: "jr_tipo_adubo",     label: "Tipo e dosagem aplicados",              grupo: "Nutrição",       tipo: "texto"  },
      { id: "jr_substrato",      label: "Troca ou correção de substrato",        grupo: "Nutrição",       critico: false },
      { id: "jr_deficiencia",    label: "Sintoma de deficiência nutricional",    grupo: "Nutrição",       critico: true  },
      { id: "jr_praga",          label: "Observação de praga",                   grupo: "Fitossanidade",  critico: true  },
      { id: "jr_doenca",         label: "Sintoma de doença / fungo",             grupo: "Fitossanidade",  critico: true  },
      { id: "jr_defensivo",      label: "Aplicação de defensivo realizada",      grupo: "Fitossanidade",  critico: false },
      { id: "jr_qual_defensivo", label: "Produto e dosagem aplicados",           grupo: "Fitossanidade",  tipo: "texto"  },
    ],
  },
];

// Seção fixa — sempre presente no final
const SECAO_PROXIMA_VISITA = {
  id: "proxima_visita", label: "Próxima Visita", icone: "📋",
  fixo: true,
  itens: [
    { id: "pv_ferramentas_ok",  label: "Ferramentas necessárias para próxima visita", critico: false },
    { id: "pv_ferramentas_det", label: "Quais ferramentas",                            tipo: "texto_longo" },
    { id: "pv_insumos_ok",      label: "Insumos necessários para próxima visita",      critico: false },
    { id: "pv_insumos_det",     label: "Quais insumos (substrato, esteio, adubo…)",    tipo: "texto_longo" },
    { id: "pv_obs_david",       label: "Observação para o David",                      tipo: "texto_longo" },
  ],
};

// ─── UTILITÁRIOS ──────────────────────────────────────────────────────────────
const fmt = d => new Date(d).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
const fmtH = d => new Date(d).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [tela, setTela] = useState("home");
  const [func_, setFunc_] = useState(null);
  const [clienteAtivo, setClienteAtivo] = useState(null);
  const [visitas, setVisitas] = useState([]);
  const [alertas, setAlertas] = useState([]);

  function salvarVisita(dados) {
    const v = { id: Date.now(), ts: new Date().toISOString(), cliente: clienteAtivo, funcionario: func_, ...dados };
    setVisitas(p => [v, ...p]);
    // alertas críticos
    const novos = [];
    [...(dados.secoesAtivas || []).map(id => SECOES_OPCIONAIS.find(s => s.id === id)).filter(Boolean), SECAO_PROXIMA_VISITA]
      .flatMap(s => s.itens)
      .forEach(item => {
        if (item.critico && dados.respostas[item.id] === "problema") {
          novos.push({ id: Date.now() + Math.random(), ts: new Date().toISOString(), cliente: clienteAtivo.nome, bairro: clienteAtivo.bairro, funcionario: func_.nome, item: item.label, obs: dados.textos[item.id] || "", foto: dados.fotos[item.id] || null, lido: false });
        }
      });
    if (novos.length) setAlertas(p => [...novos, ...p]);
    setClienteAtivo(null);
    setTela("home");
  }

  return (
    <div style={{ fontFamily: "-apple-system, 'SF Pro Display', 'Plus Jakarta Sans', sans-serif", background: C.bg, minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
        button { cursor: pointer; font-family: inherit; -webkit-tap-highlight-color: transparent; }
        textarea, input { font-family: inherit; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn  { from { opacity: 0; } to { opacity: 1; } }
        .slide-up { animation: slideUp 0.4s cubic-bezier(.25,.46,.45,.94) both; }
        .fade-in  { animation: fadeIn  0.3s ease both; }
      `}</style>

      {tela === "home"      && <TelaHome func_={func_} setFunc_={setFunc_} onIniciar={c => { setClienteAtivo(c); setTela("checklist"); }} onPainel={() => setTela("painel")} alertasN={alertas.filter(a=>!a.lido).length} />}
      {tela === "checklist" && clienteAtivo && <TelaChecklist cliente={clienteAtivo} funcionario={func_} onSalvar={salvarVisita} onCancelar={() => setTela("home")} />}
      {tela === "painel"    && <TelaPainel visitas={visitas} alertas={alertas} setAlertas={setAlertas} onVoltar={() => setTela("home")} />}
    </div>
  );
}

// ─── TELA HOME ────────────────────────────────────────────────────────────────
function TelaHome({ func_, setFunc_, onIniciar, onPainel, alertasN }) {
  const hoje = new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" });
  return (
    <div style={{ maxWidth: 480, margin: "0 auto", paddingBottom: 60 }}>
      {/* Nav */}
      <div style={{ padding: "20px 24px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 11, letterSpacing: 1.5, color: C.textMuted, fontWeight: 500, textTransform: "uppercase" }}>Bravama Paisagismo</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: C.text, letterSpacing: -0.5, marginTop: 4 }}>Campo</div>
          <div style={{ fontSize: 13, color: C.textMuted, marginTop: 2, fontWeight: 400 }}>{hoje.charAt(0).toUpperCase() + hoje.slice(1)}</div>
        </div>
        <button onClick={onPainel} style={{ position: "relative", background: C.bgSecondary, border: "none", borderRadius: 14, padding: "10px 18px", fontSize: 13, fontWeight: 600, color: C.textMid, display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 15 }}>⊞</span> Painel
          {alertasN > 0 && <span style={{ position: "absolute", top: -5, right: -5, background: C.red, color: "#fff", borderRadius: "50%", width: 18, height: 18, fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{alertasN}</span>}
        </button>
      </div>

      <div style={{ padding: "32px 24px 0" }}>
        {/* Funcionário */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 11, letterSpacing: 1.5, color: C.textMuted, fontWeight: 600, textTransform: "uppercase", marginBottom: 12 }}>Quem está em campo</div>
          <div style={{ display: "flex", gap: 8 }}>
            {FUNCIONARIOS.map(f => {
              const sel = func_?.id === f.id;
              return (
                <button key={f.id} onClick={() => setFunc_(f)} style={{ flex: 1, padding: "16px 6px", borderRadius: 18, border: "none", background: sel ? f.cor : C.bgSecondary, transition: "all 0.2s cubic-bezier(.25,.46,.45,.94)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: sel ? "rgba(255,255,255,0.22)" : C.bgTertiary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: sel ? "#fff" : C.textMuted, letterSpacing: 0.5 }}>{f.iniciais}</div>
                  <span style={{ fontSize: 12, fontWeight: 600, color: sel ? "#fff" : C.textMid }}>{f.nome}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Clientes */}
        {func_ ? (
          <div className="slide-up">
            <div style={{ fontSize: 11, letterSpacing: 1.5, color: C.textMuted, fontWeight: 600, textTransform: "uppercase", marginBottom: 12 }}>Clientes</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {CLIENTES.map((c, i) => (
                <button key={c.id} onClick={() => onIniciar(c)} style={{ background: C.bgSecondary, border: "none", borderRadius: 16, padding: "16px 18px", textAlign: "left", display: "flex", alignItems: "center", gap: 14, transition: "background 0.15s", animation: `slideUp 0.35s cubic-bezier(.25,.46,.45,.94) ${i * 0.03}s both` }}
                  onMouseEnter={e => e.currentTarget.style.background = C.bgTertiary}
                  onMouseLeave={e => e.currentTarget.style.background = C.bgSecondary}
                >
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: C.greenLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
                    {c.id === 5 ? "🧹" : c.id === 6 ? "🌱" : "🌿"}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 600, color: C.text, marginBottom: 2 }}>{c.nome}</div>
                    <div style={{ fontSize: 12, color: C.textMuted, fontWeight: 400 }}>
                      {c.bairro}{c.endereco ? ` · ${c.endereco}` : ""} · {c.frequencia}d
                    </div>
                  </div>
                  <svg width="7" height="12" viewBox="0 0 7 12" fill="none"><path d="M1 1l5 5-5 5" stroke={C.textMuted} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "64px 20px", color: C.textMuted, fontSize: 14, fontWeight: 400 }}>
            <div style={{ fontSize: 40, marginBottom: 14, opacity: 0.2 }}>👆</div>
            Selecione seu nome acima para continuar
          </div>
        )}
      </div>
    </div>
  );
}

// ─── TELA CHECKLIST ───────────────────────────────────────────────────────────
function TelaChecklist({ cliente, funcionario, onSalvar, onCancelar }) {
  const [etapa, setEtapa] = useState("ativar"); // ativar | preencher
  const [secoesAtivas, setSecoesAtivas] = useState([]);
  const [secaoIdx, setSecaoIdx] = useState(0);
  const [respostas, setRespostas] = useState({});
  const [textos, setTextos] = useState({});
  const [fotos, setFotos] = useState({});
  const [confirmando, setConfirmando] = useState(false);
  const scrollRef = useRef();

  const todasSecoes = [...secoesAtivas.map(id => SECOES_OPCIONAIS.find(s => s.id === id)).filter(Boolean), SECAO_PROXIMA_VISITA];
  const secaoAtual = todasSecoes[secaoIdx];

  const totalStatus = todasSecoes.flatMap(s => s.itens).filter(i => !i.tipo).length;
  const respondidos = Object.keys(respostas).length;
  const progresso = totalStatus > 0 ? Math.min(100, Math.round(respondidos / totalStatus * 100)) : 0;

  function toggleSecao(id) {
    setSecoesAtivas(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  }

  function handleFoto(itemId, e) {
    const f = e.target.files[0]; if (!f) return;
    const r = new FileReader();
    r.onload = ev => setFotos(p => ({ ...p, [itemId]: ev.target.result }));
    r.readAsDataURL(f);
  }

  if (etapa === "ativar") {
    return (
      <div style={{ maxWidth: 480, margin: "0 auto", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <div style={{ padding: "20px 20px 0", borderBottom: `1px solid ${C.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, paddingBottom: 20 }}>
            <button onClick={onCancelar} style={{ background: C.bgSecondary, border: "none", borderRadius: "50%", width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: C.textMid }}>‹</button>
            <div>
              <div style={{ fontSize: 17, fontWeight: 700, color: C.text, letterSpacing: -0.3 }}>{cliente.nome}</div>
              <div style={{ fontSize: 12, color: C.textMuted }}>📍 {cliente.bairro}{cliente.endereco ? ` · ${cliente.endereco}` : ""}</div>
            </div>
          </div>
        </div>

        <div style={{ flex: 1, padding: "28px 20px" }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: C.text, letterSpacing: -0.4, marginBottom: 6 }}>O que tem nessa visita?</div>
          <div style={{ fontSize: 14, color: C.textMuted, marginBottom: 28, fontWeight: 400 }}>Selecione os elementos presentes neste cliente</div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
            {SECOES_OPCIONAIS.map(s => {
              const ativa = secoesAtivas.includes(s.id);
              return (
                <button key={s.id} onClick={() => toggleSecao(s.id)} style={{ background: ativa ? C.greenLight : C.bgSecondary, border: `1.5px solid ${ativa ? C.green : "transparent"}`, borderRadius: 18, padding: "18px 20px", display: "flex", alignItems: "center", gap: 16, transition: "all 0.2s" }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: ativa ? C.green : C.bgTertiary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, transition: "all 0.2s", flexShrink: 0 }}>{s.icone}</div>
                  <div style={{ flex: 1, textAlign: "left" }}>
                    <div style={{ fontSize: 16, fontWeight: 600, color: ativa ? C.green : C.text }}>{s.label}</div>
                    <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>{s.itens.filter(i => !i.tipo).length} itens de verificação</div>
                  </div>
                  <div style={{ width: 24, height: 24, borderRadius: "50%", background: ativa ? C.green : C.bgTertiary, border: `2px solid ${ativa ? C.green : C.border}`, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s", flexShrink: 0 }}>
                    {ativa && <svg width="10" height="8" viewBox="0 0 10 8"><path d="M1 4l3 3 5-6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Seção fixa — sempre */}
          <div style={{ background: C.amberLight, border: `1px solid #f0d0a0`, borderRadius: 14, padding: "14px 18px", display: "flex", gap: 12, alignItems: "center", marginBottom: 28 }}>
            <span style={{ fontSize: 22 }}>📋</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.amber }}>Próxima Visita</div>
              <div style={{ fontSize: 12, color: C.textMuted }}>Ferramentas, insumos e obs. para o David — sempre inclusa</div>
            </div>
          </div>

          <button
            onClick={() => { if (secoesAtivas.length === 0 && !window.confirm("Nenhum elemento selecionado. Continuar só com Próxima Visita?")) return; setEtapa("preencher"); }}
            style={{ width: "100%", padding: "17px", background: C.green, border: "none", borderRadius: 16, fontSize: 16, fontWeight: 600, color: "#fff", letterSpacing: -0.2, boxShadow: "0 4px 20px rgba(30,107,58,0.25)" }}
          >
            Iniciar checklist →
          </button>
        </div>
      </div>
    );
  }

  // ── etapa preencher ──
  return (
    <div style={{ maxWidth: 480, margin: "0 auto", height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header fixo */}
      <div style={{ background: C.bg, borderBottom: `1px solid ${C.border}`, flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 16px 10px" }}>
          <button onClick={onCancelar} style={{ background: C.bgSecondary, border: "none", borderRadius: "50%", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: C.textMid }}>‹</button>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: C.text, letterSpacing: -0.3 }}>{cliente.nome}</div>
            <div style={{ fontSize: 11, color: C.textMuted }}>📍 {cliente.bairro} · {funcionario.nome}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: C.green, letterSpacing: -0.5, lineHeight: 1 }}>{progresso}%</div>
            <div style={{ fontSize: 10, color: C.textMuted }}>feito</div>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ height: 2, background: C.bgTertiary }}>
          <div style={{ height: 2, background: C.green, width: `${progresso}%`, transition: "width 0.4s ease" }} />
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", overflowX: "auto", scrollbarWidth: "none", padding: "0 4px" }}>
          {todasSecoes.map((s, i) => (
            <button key={s.id} onClick={() => { setSecaoIdx(i); scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" }); }}
              style={{ background: "none", border: "none", borderBottom: i === secaoIdx ? `2px solid ${C.green}` : "2px solid transparent", padding: "11px 12px", fontSize: 12, fontWeight: i === secaoIdx ? 600 : 400, color: i === secaoIdx ? C.green : C.textMuted, whiteSpace: "nowrap", transition: "all 0.15s" }}
            >{s.icone} {s.label}</button>
          ))}
        </div>
      </div>

      {/* Scroll area */}
      <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", padding: "16px 16px 100px" }}>
        {secaoAtual && (() => {
          const grupos = [...new Set(secaoAtual.itens.map(i => i.grupo).filter(Boolean))];
          return grupos.length > 0
            ? grupos.map(grupo => (
                <div key={grupo} style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 11, letterSpacing: 1.5, color: C.textMuted, fontWeight: 600, textTransform: "uppercase", marginBottom: 8, paddingLeft: 4 }}>{grupo}</div>
                  {secaoAtual.itens.filter(i => i.grupo === grupo).map(item => (
                    <ItemChecklist key={item.id} item={item} resposta={respostas[item.id]} texto={textos[item.id] || ""} foto={fotos[item.id]} onResposta={v => setRespostas(p => ({ ...p, [item.id]: v }))} onTexto={v => setTextos(p => ({ ...p, [item.id]: v }))} onFoto={e => handleFoto(item.id, e)} onRemoverFoto={() => setFotos(p => { const n={...p}; delete n[item.id]; return n; })} />
                  ))}
                </div>
              ))
            : secaoAtual.itens.map(item => (
                <ItemChecklist key={item.id} item={item} resposta={respostas[item.id]} texto={textos[item.id] || ""} foto={fotos[item.id]} onResposta={v => setRespostas(p => ({ ...p, [item.id]: v }))} onTexto={v => setTextos(p => ({ ...p, [item.id]: v }))} onFoto={e => handleFoto(item.id, e)} onRemoverFoto={() => setFotos(p => { const n={...p}; delete n[item.id]; return n; })} />
              ));
        })()}

        {/* Navegação */}
        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          {secaoIdx > 0 && <button onClick={() => { setSecaoIdx(i => i-1); scrollRef.current?.scrollTo({top:0}); }} style={{ flex:1, padding:"14px", background:C.bgSecondary, border:"none", borderRadius:14, fontSize:13, fontWeight:600, color:C.textMid }}>‹ Anterior</button>}
          {secaoIdx < todasSecoes.length - 1
            ? <button onClick={() => { setSecaoIdx(i => i+1); scrollRef.current?.scrollTo({top:0}); }} style={{ flex:2, padding:"14px", background:C.green, border:"none", borderRadius:14, fontSize:13, fontWeight:600, color:"#fff" }}>Próxima →</button>
            : <button onClick={() => setConfirmando(true)} style={{ flex:2, padding:"14px", background:C.green, border:"none", borderRadius:14, fontSize:13, fontWeight:700, color:"#fff", boxShadow:"0 4px 16px rgba(30,107,58,0.3)" }}>✓ Finalizar visita</button>
          }
        </div>
      </div>

      {/* Modal confirmar */}
      {confirmando && (
        <div className="fade-in" style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.4)", display:"flex", alignItems:"flex-end", justifyContent:"center", zIndex:300 }} onClick={() => setConfirmando(false)}>
          <div className="slide-up" style={{ background:C.bg, borderRadius:"24px 24px 0 0", padding:"28px 24px 48px", width:"100%", maxWidth:480 }} onClick={e=>e.stopPropagation()}>
            <div style={{ width:40, height:4, background:C.bgTertiary, borderRadius:2, margin:"0 auto 24px" }} />
            <div style={{ fontSize:22, fontWeight:700, color:C.text, letterSpacing:-0.5, marginBottom:6, textAlign:"center" }}>Finalizar visita?</div>
            <div style={{ fontSize:14, color:C.textMuted, textAlign:"center", marginBottom:28 }}>{progresso}% preenchido · {cliente.nome}</div>
            <div style={{ display:"flex", gap:10 }}>
              <button onClick={() => setConfirmando(false)} style={{ flex:1, padding:"15px", background:C.bgSecondary, border:"none", borderRadius:14, fontSize:14, fontWeight:600, color:C.textMid }}>Cancelar</button>
              <button onClick={() => { setConfirmando(false); onSalvar({ secoesAtivas, respostas, textos, fotos }); }} style={{ flex:2, padding:"15px", background:C.green, border:"none", borderRadius:14, fontSize:14, fontWeight:700, color:"#fff" }}>✓ Confirmar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── ITEM CHECKLIST ───────────────────────────────────────────────────────────
function ItemChecklist({ item, resposta, texto, foto, onResposta, onTexto, onFoto, onRemoverFoto }) {
  const fileRef = useRef();
  const isTexto = item.tipo === "texto" || item.tipo === "texto_longo";
  const temResp = resposta === "ok" || resposta === "problema";

  const STATUS = [
    { k:"ok",         label:"OK",      sym:"✓", activeBg:C.greenLight, activeColor:C.green,   activeBorder:C.greenMid },
    { k:"problema",   label:"Problema",sym:"!",  activeBg:C.redLight,   activeColor:C.red,     activeBorder:C.red      },
    { k:"nao_aplica", label:"N/A",     sym:"—",  activeBg:C.bgSecondary,activeColor:C.textMid, activeBorder:C.border   },
  ];

  return (
    <div style={{ background:C.bgSecondary, borderRadius:14, marginBottom:8, overflow:"hidden", border: resposta==="problema" && item.critico ? `1px solid ${C.red}` : "1px solid transparent", transition:"border 0.2s" }}>
      <div style={{ padding:"14px 14px 12px" }}>
        <div style={{ fontSize:14, fontWeight:500, color:C.text, marginBottom: isTexto ? 10 : 12, display:"flex", gap:6, alignItems:"flex-start", lineHeight:1.4 }}>
          {item.critico && <span style={{ color:C.amber, fontSize:11, marginTop:2, flexShrink:0 }}>●</span>}
          {item.label}
        </div>

        {isTexto ? (
          <textarea value={texto} onChange={e=>onTexto(e.target.value)} placeholder="Digite aqui..." rows={item.tipo==="texto_longo" ? 3 : 2}
            style={{ width:"100%", border:"none", borderRadius:10, padding:"10px 12px", fontSize:13, color:C.text, background:C.bg, resize:"none", outline:"none", lineHeight:1.5 }} />
        ) : (
          <div style={{ display:"flex", gap:6 }}>
            {STATUS.map(s => {
              const sel = resposta === s.k;
              return (
                <button key={s.k} onClick={() => onResposta(sel ? null : s.k)}
                  style={{ flex:1, padding:"10px 4px", border:`1.5px solid ${sel ? s.activeBorder : "transparent"}`, borderRadius:10, background:sel ? s.activeBg : C.bg, color:sel ? s.activeColor : C.textMuted, fontSize:12, fontWeight:sel?700:500, transition:"all 0.15s", display:"flex", flexDirection:"column", alignItems:"center", gap:3 }}>
                  <span style={{ fontSize:14 }}>{s.sym}</span>
                  <span>{s.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {!isTexto && temResp && (
        <div style={{ padding:"0 14px 14px", borderTop:`1px solid ${C.border}`, marginTop:-1, paddingTop:12 }}>
          <textarea value={texto} onChange={e=>onTexto(e.target.value)} placeholder="Observação (opcional)..." rows={2}
            style={{ width:"100%", border:"none", borderRadius:10, padding:"8px 12px", fontSize:12, color:C.text, background:C.bg, resize:"none", outline:"none", marginBottom:10 }} />
          {foto ? (
            <div style={{ position:"relative", display:"inline-block" }}>
              <img src={foto} alt="" style={{ height:72, borderRadius:10, objectFit:"cover", border:`1px solid ${C.border}` }} />
              <button onClick={onRemoverFoto} style={{ position:"absolute", top:-6, right:-6, background:C.red, color:"#fff", border:"none", borderRadius:"50%", width:20, height:20, fontSize:12, display:"flex", alignItems:"center", justifyContent:"center" }}>×</button>
            </div>
          ) : (
            <button onClick={() => fileRef.current.click()} style={{ padding:"7px 14px", border:`1.5px dashed ${C.border}`, borderRadius:10, background:C.bg, color:C.textMuted, fontSize:12, fontWeight:500, display:"flex", alignItems:"center", gap:6 }}>
              <span>📷</span> Adicionar foto
            </button>
          )}
          <input ref={fileRef} type="file" accept="image/*" capture="environment" style={{ display:"none" }} onChange={onFoto} />
        </div>
      )}
    </div>
  );
}

// ─── TELA PAINEL ──────────────────────────────────────────────────────────────
function TelaPainel({ visitas, alertas, setAlertas, onVoltar }) {
  const [aba, setAba] = useState("alertas");
  const [expandida, setExpandida] = useState(null);

  const naoLidos = alertas.filter(a=>!a.lido).length;
  const pendencias = visitas.flatMap(v => {
    const secoes = [...(v.secoesAtivas||[]).map(id=>SECOES_OPCIONAIS.find(s=>s.id===id)).filter(Boolean), SECAO_PROXIMA_VISITA];
    return secoes.flatMap(s => s.itens.filter(i=>!i.tipo && v.respostas[i.id]==="problema").map(i=>({ key:v.id+i.id, cliente:v.cliente.nome, bairro:v.cliente.bairro, item:i.label, obs:v.textos?.[i.id]||"", foto:v.fotos?.[i.id]||null, ts:v.ts, funcionario:v.funcionario.nome, critico:i.critico })));
  });

  const ABAS = [{ id:"alertas",label:"Alertas",badge:naoLidos },{ id:"historico",label:"Histórico" },{ id:"pendencias",label:"Pendências",badge:pendencias.length }];

  return (
    <div style={{ maxWidth:480, margin:"0 auto", height:"100vh", display:"flex", flexDirection:"column" }}>
      <div style={{ background:C.bg, borderBottom:`1px solid ${C.border}`, flexShrink:0 }}>
        <div style={{ padding:"20px 20px 16px", display:"flex", alignItems:"center", gap:12 }}>
          <button onClick={onVoltar} style={{ background:C.bgSecondary, border:"none", borderRadius:"50%", width:34, height:34, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, color:C.textMid }}>‹</button>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:22, fontWeight:700, color:C.text, letterSpacing:-0.4 }}>Painel</div>
            <div style={{ fontSize:12, color:C.textMuted }}>Bravama · David</div>
          </div>
        </div>

        {/* Cards */}
        <div style={{ display:"flex", gap:8, padding:"0 20px 16px" }}>
          {[
            { label:"Visitas hoje", val:visitas.filter(v=>new Date(v.ts).toDateString()===new Date().toDateString()).length, color:C.green },
            { label:"Alertas",      val:naoLidos,          color:naoLidos>0?C.red:C.green },
            { label:"Pendências",   val:pendencias.length, color:C.amber },
          ].map((c,i) => (
            <div key={i} style={{ flex:1, background:C.bgSecondary, borderRadius:16, padding:"12px 10px", textAlign:"center" }}>
              <div style={{ fontSize:26, fontWeight:700, color:c.color, letterSpacing:-0.5, lineHeight:1 }}>{c.val}</div>
              <div style={{ fontSize:10, color:C.textMuted, marginTop:4, fontWeight:500 }}>{c.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display:"flex", borderTop:`1px solid ${C.border}` }}>
          {ABAS.map(a => (
            <button key={a.id} onClick={()=>setAba(a.id)} style={{ flex:1, background:"none", border:"none", borderBottom:aba===a.id?`2px solid ${C.green}`:"2px solid transparent", padding:"12px 4px", fontSize:12, fontWeight:aba===a.id?600:400, color:aba===a.id?C.green:C.textMuted, display:"flex", alignItems:"center", justifyContent:"center", gap:5, transition:"all 0.15s" }}>
              {a.label}
              {a.badge>0 && <span style={{ background:aba===a.id?C.green:C.textMuted, color:"#fff", borderRadius:10, padding:"1px 6px", fontSize:10, fontWeight:700 }}>{a.badge}</span>}
            </button>
          ))}
        </div>
      </div>

      <div style={{ flex:1, overflowY:"auto", padding:"16px" }}>
        {aba==="alertas" && (
          <div>
            {naoLidos>0 && <button onClick={()=>setAlertas(p=>p.map(a=>({...a,lido:true})))} style={{ width:"100%", padding:"10px", background:C.bgSecondary, border:"none", borderRadius:12, fontSize:12, fontWeight:600, color:C.green, marginBottom:12 }}>✓ Marcar todos como lidos</button>}
            {alertas.length===0 && <Vazio icone="✓" titulo="Sem alertas" sub="Tudo tranquilo por aqui" />}
            {alertas.map(a => (
              <div key={a.id} style={{ background:a.lido?C.bgSecondary:C.bg, border:`1px solid ${a.lido?C.border:C.red}`, borderRadius:16, padding:"14px", marginBottom:8, opacity:a.lido?0.5:1, transition:"all 0.2s" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:8 }}>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:13, fontWeight:600, color:C.red, marginBottom:3 }}>● {a.item}</div>
                    <div style={{ fontSize:11, color:C.textMuted }}>{a.cliente} · {a.funcionario} · {fmt(a.ts)} {fmtH(a.ts)}</div>
                    {a.obs && <div style={{ fontSize:12, color:C.textMid, marginTop:5, fontStyle:"italic" }}>"{a.obs}"</div>}
                  </div>
                  {!a.lido && <button onClick={()=>setAlertas(p=>p.map(x=>x.id===a.id?{...x,lido:true}:x))} style={{ padding:"5px 10px", background:C.bgSecondary, border:"none", borderRadius:8, fontSize:11, fontWeight:600, color:C.green, flexShrink:0 }}>✓ Lido</button>}
                </div>
                {a.foto && <img src={a.foto} alt="" style={{ height:64, borderRadius:8, marginTop:10, objectFit:"cover", border:`1px solid ${C.border}` }} />}
              </div>
            ))}
          </div>
        )}

        {aba==="historico" && (
          <div>
            {visitas.length===0 && <Vazio icone="📋" titulo="Sem visitas ainda" sub="As visitas finalizadas aparecerão aqui" />}
            {visitas.map(v => {
              const probs = Object.values(v.respostas).filter(r=>r==="problema").length;
              const oks   = Object.values(v.respostas).filter(r=>r==="ok").length;
              const open  = expandida===v.id;
              const secoes = [...(v.secoesAtivas||[]).map(id=>SECOES_OPCIONAIS.find(s=>s.id===id)).filter(Boolean), SECAO_PROXIMA_VISITA];
              return (
                <div key={v.id} style={{ background:C.bgSecondary, borderRadius:16, marginBottom:8, overflow:"hidden" }}>
                  <button onClick={()=>setExpandida(open?null:v.id)} style={{ width:"100%", padding:"14px 16px", background:"none", border:"none", display:"flex", alignItems:"center", gap:12, textAlign:"left" }}>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:15, fontWeight:600, color:C.text }}>{v.cliente.nome}</div>
                      <div style={{ fontSize:11, color:C.textMuted, marginTop:2 }}>📍 {v.cliente.bairro} · {v.funcionario.nome} · {fmt(v.ts)} {fmtH(v.ts)}</div>
                    </div>
                    <div style={{ display:"flex", gap:6, alignItems:"center" }}>
                      {probs>0 && <span style={{ background:C.redLight, color:C.red, borderRadius:8, padding:"3px 8px", fontSize:11, fontWeight:700 }}>{probs}✕</span>}
                      <span style={{ background:C.greenLight, color:C.green, borderRadius:8, padding:"3px 8px", fontSize:11, fontWeight:700 }}>{oks}✓</span>
                      <span style={{ color:C.textMuted, fontSize:14 }}>{open?"∧":"∨"}</span>
                    </div>
                  </button>
                  {open && (
                    <div style={{ borderTop:`1px solid ${C.border}`, padding:"12px 16px" }}>
                      {secoes.map(secao => {
                        const itensResp = secao.itens.filter(i=>!i.tipo && v.respostas[i.id]);
                        if (!itensResp.length) return null;
                        return (
                          <div key={secao.id} style={{ marginBottom:14 }}>
                            <div style={{ fontSize:10, letterSpacing:1.5, color:C.textMuted, fontWeight:600, textTransform:"uppercase", marginBottom:8 }}>{secao.icone} {secao.label}</div>
                            {itensResp.map(item => {
                              const r = v.respostas[item.id];
                              return (
                                <div key={item.id} style={{ display:"flex", gap:8, marginBottom:6, alignItems:"flex-start" }}>
                                  <span style={{ padding:"2px 8px", borderRadius:6, fontSize:10, fontWeight:700, flexShrink:0, background:r==="ok"?C.greenLight:r==="problema"?C.redLight:C.bgTertiary, color:r==="ok"?C.green:r==="problema"?C.red:C.textMuted }}>
                                    {r==="ok"?"OK":r==="problema"?"PROB":"N/A"}
                                  </span>
                                  <div>
                                    <div style={{ fontSize:12, color:C.textMid }}>{item.label}</div>
                                    {v.textos?.[item.id] && <div style={{ fontSize:11, color:C.textMuted, fontStyle:"italic" }}>"{v.textos[item.id]}"</div>}
                                    {v.fotos?.[item.id] && <img src={v.fotos[item.id]} alt="" style={{ height:48, borderRadius:6, marginTop:4 }} />}
                                  </div>
                                </div>
                              );
                            })}
                            {/* Textos da seção */}
                            {secao.itens.filter(i=>i.tipo && v.textos?.[i.id]).map(item => (
                              <div key={item.id} style={{ marginBottom:6 }}>
                                <div style={{ fontSize:10, color:C.textMuted, marginBottom:2 }}>{item.label}</div>
                                <div style={{ fontSize:12, color:C.text, background:C.bg, borderRadius:8, padding:"6px 10px" }}>{v.textos[item.id]}</div>
                              </div>
                            ))}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {aba==="pendencias" && (
          <div>
            {pendencias.length===0 && <Vazio icone="●" titulo="Sem pendências" sub="Itens com problema aparecerão aqui" />}
            {pendencias.map(p => (
              <div key={p.key} style={{ background:C.bgSecondary, borderLeft:`3px solid ${p.critico?C.red:C.amber}`, borderRadius:14, padding:"14px 16px", marginBottom:8 }}>
                <div style={{ fontSize:13, fontWeight:600, color:p.critico?C.red:C.amber, marginBottom:4 }}>{p.item}</div>
                <div style={{ fontSize:11, color:C.textMuted }}>{p.cliente} · {p.bairro} · {p.funcionario} · {fmt(p.ts)}</div>
                {p.obs && <div style={{ fontSize:12, color:C.textMid, marginTop:6, fontStyle:"italic" }}>"{p.obs}"</div>}
                {p.foto && <img src={p.foto} alt="" style={{ height:56, borderRadius:8, marginTop:8 }} />}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Vazio({ icone, titulo, sub }) {
  return (
    <div style={{ textAlign:"center", padding:"72px 20px" }}>
      <div style={{ fontSize:32, marginBottom:12, opacity:0.15, color:C.text }}>{icone}</div>
      <div style={{ fontSize:15, fontWeight:600, color:C.textMid, marginBottom:4 }}>{titulo}</div>
      <div style={{ fontSize:13, color:C.textMuted, fontWeight:400 }}>{sub}</div>
    </div>
  );
}
