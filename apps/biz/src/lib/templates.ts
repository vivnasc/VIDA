/**
 * Business template definitions with pre-configured services,
 * expense categories, and stock categories per business type.
 * Used during onboarding and to customize the app experience.
 */

import {
  Scissors,
  Shirt,
  Beer,
  ShoppingBag,
  UtensilsCrossed,
  Car,
  Wrench,
  Ruler,
  HardHat,
  Smartphone,
  Sparkles,
  Package,
  type LucideIcon,
} from "lucide-react";

export interface ServiceDefinition {
  name: string;
  defaultPrice: number;
  durationMinutes?: number;
  costEstimate?: number;
}

export interface ExpenseCategory {
  name: string;
  icon: string;
}

export interface StockCategory {
  name: string;
  unit: string;
  hasExpiry: boolean;
}

export interface TemplateDefinition {
  id: string;
  name: string;
  emoji: string;
  description: string;
  icon: LucideIcon;
  color: string;
  services: ServiceDefinition[];
  expenseCategories: ExpenseCategory[];
  stockCategories: StockCategory[];
  hasAppointments: boolean;
  hasDelivery: boolean;
  quickSaleMode: boolean;
  staffRoles: string[];
  kpiLabels: {
    mainMetric: string;
    secondaryMetric: string;
  };
}

export const BUSINESS_TEMPLATES: Record<string, TemplateDefinition> = {
  salao: {
    id: "salao",
    name: "Salão de Beleza / Barbearia",
    emoji: "💇‍♀️",
    description: "Cortes, tranças, unhas, makeup e mais",
    icon: Scissors,
    color: "bg-pink-500",
    hasAppointments: true,
    hasDelivery: false,
    quickSaleMode: false,
    staffRoles: ["Cabeleireira", "Barbeiro", "Manicure", "Esteticista", "Assistente"],
    kpiLabels: { mainMetric: "Atendimentos", secondaryMetric: "Receita/Atendimento" },
    services: [
      { name: "Tranças", defaultPrice: 1500, durationMinutes: 240, costEstimate: 175 },
      { name: "Alisamento", defaultPrice: 2500, durationMinutes: 180, costEstimate: 350 },
      { name: "Corte + Escova", defaultPrice: 800, durationMinutes: 90, costEstimate: 50 },
      { name: "Unhas gel", defaultPrice: 600, durationMinutes: 60, costEstimate: 80 },
      { name: "Makeup", defaultPrice: 1200, durationMinutes: 60, costEstimate: 200 },
      { name: "Hidratação", defaultPrice: 1000, durationMinutes: 120, costEstimate: 100 },
      { name: "Sobrancelhas", defaultPrice: 300, durationMinutes: 30, costEstimate: 20 },
      { name: "Barba", defaultPrice: 250, durationMinutes: 30, costEstimate: 15 },
      { name: "Coloração", defaultPrice: 2000, durationMinutes: 150, costEstimate: 300 },
      { name: "Crochet", defaultPrice: 1800, durationMinutes: 300, costEstimate: 200 },
      { name: "Pedicure", defaultPrice: 500, durationMinutes: 45, costEstimate: 60 },
      { name: "Lavagem + Secagem", defaultPrice: 400, durationMinutes: 45, costEstimate: 30 },
    ],
    expenseCategories: [
      { name: "Produtos beleza", icon: "Droplets" },
      { name: "Electricidade", icon: "Zap" },
      { name: "Água", icon: "Droplet" },
      { name: "Renda espaço", icon: "Home" },
      { name: "Lanche staff", icon: "Coffee" },
      { name: "Limpeza", icon: "SprayCanIcon" },
    ],
    stockCategories: [
      { name: "Cremes", unit: "un", hasExpiry: true },
      { name: "Extensões", unit: "packs", hasExpiry: false },
      { name: "Vernizes", unit: "un", hasExpiry: true },
      { name: "Shampoos", unit: "un", hasExpiry: true },
      { name: "Tinturas", unit: "un", hasExpiry: true },
      { name: "Makeup", unit: "un", hasExpiry: true },
    ],
  },

  loja_roupa: {
    id: "loja_roupa",
    name: "Loja de Roupa / Boutique",
    emoji: "👗",
    description: "Roupas, acessórios e calçado",
    icon: Shirt,
    color: "bg-purple-500",
    hasAppointments: false,
    hasDelivery: true,
    quickSaleMode: false,
    staffRoles: ["Vendedora", "Caixa", "Revendedora", "Assistente"],
    kpiLabels: { mainMetric: "Peças Vendidas", secondaryMetric: "Ticket Médio" },
    services: [
      { name: "Vestido", defaultPrice: 850 },
      { name: "Blusa", defaultPrice: 450 },
      { name: "Calça", defaultPrice: 650 },
      { name: "Saia", defaultPrice: 500 },
      { name: "T-shirt", defaultPrice: 350 },
      { name: "Camisa", defaultPrice: 600 },
      { name: "Casaco", defaultPrice: 1200 },
      { name: "Sapatos", defaultPrice: 900 },
      { name: "Sandálias", defaultPrice: 500 },
      { name: "Acessório", defaultPrice: 200 },
      { name: "Bolsa", defaultPrice: 700 },
      { name: "Bijuteria", defaultPrice: 150 },
    ],
    expenseCategories: [
      { name: "Compra stock", icon: "ShoppingBag" },
      { name: "Viagem compras", icon: "Plane" },
      { name: "Renda loja", icon: "Home" },
      { name: "Electricidade", icon: "Zap" },
      { name: "Marketing", icon: "Megaphone" },
      { name: "Embalagem", icon: "Package" },
    ],
    stockCategories: [
      { name: "Roupa feminina", unit: "peças", hasExpiry: false },
      { name: "Roupa masculina", unit: "peças", hasExpiry: false },
      { name: "Calçado", unit: "pares", hasExpiry: false },
      { name: "Acessórios", unit: "un", hasExpiry: false },
    ],
  },

  bottle_store: {
    id: "bottle_store",
    name: "Bottle Store",
    emoji: "🍺",
    description: "Cervejas, refrigerantes, spirits",
    icon: Beer,
    color: "bg-amber-600",
    hasAppointments: false,
    hasDelivery: false,
    quickSaleMode: true,
    staffRoles: ["Atendente", "Caixa", "Segurança"],
    kpiLabels: { mainMetric: "Unidades Vendidas", secondaryMetric: "Receita/Hora" },
    services: [
      { name: "2M (garrafa)", defaultPrice: 35, costEstimate: 20 },
      { name: "Laurentina (garrafa)", defaultPrice: 35, costEstimate: 20 },
      { name: "Impala", defaultPrice: 30, costEstimate: 17 },
      { name: "Coca-Cola", defaultPrice: 30, costEstimate: 15 },
      { name: "Fanta", defaultPrice: 30, costEstimate: 15 },
      { name: "Água 500ml", defaultPrice: 15, costEstimate: 8 },
      { name: "Água 1.5L", defaultPrice: 30, costEstimate: 15 },
      { name: "Sumo", defaultPrice: 40, costEstimate: 22 },
      { name: "Whisky J&B", defaultPrice: 1400, costEstimate: 900 },
      { name: "Gin", defaultPrice: 800, costEstimate: 500 },
      { name: "Vinho", defaultPrice: 600, costEstimate: 350 },
      { name: "Amendoim", defaultPrice: 20, costEstimate: 10 },
    ],
    expenseCategories: [
      { name: "Reposição stock", icon: "Package" },
      { name: "Electricidade (frigorifico)", icon: "Zap" },
      { name: "Renda", icon: "Home" },
      { name: "Gelo", icon: "Snowflake" },
      { name: "Manutenção frigoríficos", icon: "Wrench" },
    ],
    stockCategories: [
      { name: "Cervejas", unit: "garrafas", hasExpiry: true },
      { name: "Refrigerantes", unit: "garrafas", hasExpiry: true },
      { name: "Spirits", unit: "garrafas", hasExpiry: false },
      { name: "Água", unit: "garrafas", hasExpiry: true },
      { name: "Snacks", unit: "pacotes", hasExpiry: true },
    ],
  },

  banca: {
    id: "banca",
    name: "Banca / Mercearia",
    emoji: "🏪",
    description: "Produtos variados do dia-a-dia",
    icon: ShoppingBag,
    color: "bg-green-600",
    hasAppointments: false,
    hasDelivery: false,
    quickSaleMode: true,
    staffRoles: ["Vendedor", "Caixa", "Reponedor"],
    kpiLabels: { mainMetric: "Vendas", secondaryMetric: "Ticket Médio" },
    services: [
      { name: "Arroz (kg)", defaultPrice: 80, costEstimate: 55 },
      { name: "Feijão (kg)", defaultPrice: 120, costEstimate: 85 },
      { name: "Açúcar (kg)", defaultPrice: 70, costEstimate: 50 },
      { name: "Óleo (litro)", defaultPrice: 150, costEstimate: 110 },
      { name: "Farinha milho (kg)", defaultPrice: 65, costEstimate: 45 },
      { name: "Tomate (kg)", defaultPrice: 60, costEstimate: 35 },
      { name: "Cebola (kg)", defaultPrice: 50, costEstimate: 30 },
      { name: "Pão", defaultPrice: 10, costEstimate: 7 },
      { name: "Ovos (dúzia)", defaultPrice: 120, costEstimate: 85 },
      { name: "Leite (litro)", defaultPrice: 80, costEstimate: 55 },
      { name: "Sabão", defaultPrice: 30, costEstimate: 18 },
      { name: "Recargas", defaultPrice: 50, costEstimate: 45 },
    ],
    expenseCategories: [
      { name: "Compra grossista", icon: "Truck" },
      { name: "Transporte mercadoria", icon: "Car" },
      { name: "Renda banca", icon: "Home" },
      { name: "Perdas/Estragos", icon: "Trash2" },
    ],
    stockCategories: [
      { name: "Frescos", unit: "kg", hasExpiry: true },
      { name: "Secos", unit: "kg", hasExpiry: true },
      { name: "Bebidas", unit: "un", hasExpiry: true },
      { name: "Limpeza", unit: "un", hasExpiry: false },
      { name: "Recargas", unit: "un", hasExpiry: false },
    ],
  },

  restaurante: {
    id: "restaurante",
    name: "Restaurante / Take-Away",
    emoji: "🍕",
    description: "Refeições, pratos e delivery",
    icon: UtensilsCrossed,
    color: "bg-red-500",
    hasAppointments: false,
    hasDelivery: true,
    quickSaleMode: true,
    staffRoles: ["Cozinheiro", "Ajudante cozinha", "Empregado mesa", "Caixa", "Entregador"],
    kpiLabels: { mainMetric: "Pratos Servidos", secondaryMetric: "Food Cost" },
    services: [
      { name: "Frango grelhado c/ arroz", defaultPrice: 650, costEstimate: 225 },
      { name: "Matapa c/ arroz", defaultPrice: 400, costEstimate: 120 },
      { name: "Caril de amendoim", defaultPrice: 450, costEstimate: 140 },
      { name: "Peixe grelhado c/ xima", defaultPrice: 550, costEstimate: 200 },
      { name: "Camarão grelhado", defaultPrice: 1200, costEstimate: 600 },
      { name: "Hambúrguer", defaultPrice: 350, costEstimate: 130 },
      { name: "Pizza", defaultPrice: 500, costEstimate: 150 },
      { name: "Salada", defaultPrice: 200, costEstimate: 60 },
      { name: "Sumo natural", defaultPrice: 100, costEstimate: 30 },
      { name: "Refrigerante", defaultPrice: 50, costEstimate: 25 },
      { name: "Sobremesa", defaultPrice: 150, costEstimate: 50 },
      { name: "Delivery (taxa)", defaultPrice: 100, costEstimate: 40 },
    ],
    expenseCategories: [
      { name: "Ingredientes", icon: "ShoppingCart" },
      { name: "Gás", icon: "Flame" },
      { name: "Electricidade", icon: "Zap" },
      { name: "Embalagens take-away", icon: "Package" },
      { name: "Renda", icon: "Home" },
      { name: "Limpeza", icon: "SprayCanIcon" },
    ],
    stockCategories: [
      { name: "Carnes", unit: "kg", hasExpiry: true },
      { name: "Peixe/Marisco", unit: "kg", hasExpiry: true },
      { name: "Vegetais", unit: "kg", hasExpiry: true },
      { name: "Secos (arroz, farinha)", unit: "kg", hasExpiry: true },
      { name: "Bebidas", unit: "un", hasExpiry: true },
      { name: "Embalagens", unit: "un", hasExpiry: false },
    ],
  },

  taxista: {
    id: "taxista",
    name: "Taxista / Transporte",
    emoji: "🚕",
    description: "Corridas, combustível, manutenção",
    icon: Car,
    color: "bg-yellow-500",
    hasAppointments: false,
    hasDelivery: false,
    quickSaleMode: false,
    staffRoles: ["Motorista", "Cobrador"],
    kpiLabels: { mainMetric: "Corridas", secondaryMetric: "Ganho/km" },
    services: [
      { name: "Corrida curta (bairro)", defaultPrice: 100 },
      { name: "Corrida média (cidade)", defaultPrice: 250 },
      { name: "Corrida longa (inter-bairros)", defaultPrice: 500 },
      { name: "Aeroporto", defaultPrice: 1500 },
      { name: "Corrida nocturna", defaultPrice: 350 },
      { name: "Espera (por hora)", defaultPrice: 300 },
      { name: "Dia inteiro", defaultPrice: 3000 },
    ],
    expenseCategories: [
      { name: "Combustível", icon: "Fuel" },
      { name: "Manutenção", icon: "Wrench" },
      { name: "Seguro", icon: "Shield" },
      { name: "Lavagem", icon: "Droplets" },
      { name: "Portagens", icon: "CreditCard" },
      { name: "Pneus", icon: "CircleDot" },
    ],
    stockCategories: [],
  },

  mecanico: {
    id: "mecanico",
    name: "Mecânico / Técnico",
    emoji: "🔧",
    description: "Reparações, diagnósticos, peças",
    icon: Wrench,
    color: "bg-slate-600",
    hasAppointments: true,
    hasDelivery: false,
    quickSaleMode: false,
    staffRoles: ["Mecânico chefe", "Mecânico", "Ajudante", "Electricista auto"],
    kpiLabels: { mainMetric: "Serviços Realizados", secondaryMetric: "Receita/Serviço" },
    services: [
      { name: "Mudança de óleo", defaultPrice: 800, durationMinutes: 30, costEstimate: 400 },
      { name: "Travões (pastilhas)", defaultPrice: 2500, durationMinutes: 120, costEstimate: 1200 },
      { name: "Diagnóstico", defaultPrice: 500, durationMinutes: 60, costEstimate: 0 },
      { name: "Alinhamento", defaultPrice: 1000, durationMinutes: 60, costEstimate: 100 },
      { name: "Filtro ar", defaultPrice: 600, durationMinutes: 20, costEstimate: 250 },
      { name: "Bateria", defaultPrice: 3500, durationMinutes: 30, costEstimate: 2500 },
      { name: "Correia", defaultPrice: 2000, durationMinutes: 180, costEstimate: 800 },
      { name: "AC recarga", defaultPrice: 1500, durationMinutes: 60, costEstimate: 600 },
      { name: "Mão-de-obra (hora)", defaultPrice: 500, durationMinutes: 60 },
    ],
    expenseCategories: [
      { name: "Peças", icon: "Cog" },
      { name: "Ferramentas", icon: "Wrench" },
      { name: "Electricidade", icon: "Zap" },
      { name: "Renda oficina", icon: "Home" },
      { name: "Óleo/Lubrificantes", icon: "Droplet" },
    ],
    stockCategories: [
      { name: "Peças", unit: "un", hasExpiry: false },
      { name: "Óleos", unit: "litros", hasExpiry: true },
      { name: "Filtros", unit: "un", hasExpiry: false },
      { name: "Ferramentas", unit: "un", hasExpiry: false },
    ],
  },

  alfaiate: {
    id: "alfaiate",
    name: "Alfaiate / Costureira",
    emoji: "✂️",
    description: "Roupas por medida, arranjos",
    icon: Ruler,
    color: "bg-indigo-500",
    hasAppointments: true,
    hasDelivery: true,
    quickSaleMode: false,
    staffRoles: ["Alfaiate", "Costureira", "Ajudante"],
    kpiLabels: { mainMetric: "Encomendas", secondaryMetric: "Receita/Peça" },
    services: [
      { name: "Fato completo", defaultPrice: 5000, durationMinutes: 2880, costEstimate: 2000 },
      { name: "Calça por medida", defaultPrice: 1500, durationMinutes: 1440, costEstimate: 500 },
      { name: "Camisa por medida", defaultPrice: 1200, durationMinutes: 1440, costEstimate: 400 },
      { name: "Vestido", defaultPrice: 2500, durationMinutes: 2880, costEstimate: 800 },
      { name: "Capulana (arranjo)", defaultPrice: 800, durationMinutes: 480, costEstimate: 200 },
      { name: "Bainha calça", defaultPrice: 200, durationMinutes: 30, costEstimate: 10 },
      { name: "Arranjo simples", defaultPrice: 300, durationMinutes: 60, costEstimate: 20 },
      { name: "Arranjo complexo", defaultPrice: 800, durationMinutes: 180, costEstimate: 50 },
    ],
    expenseCategories: [
      { name: "Tecidos", icon: "Shirt" },
      { name: "Linhas/Botões", icon: "Scissors" },
      { name: "Electricidade", icon: "Zap" },
      { name: "Manutenção máquinas", icon: "Wrench" },
      { name: "Renda", icon: "Home" },
    ],
    stockCategories: [
      { name: "Tecidos", unit: "metros", hasExpiry: false },
      { name: "Linhas", unit: "rolos", hasExpiry: false },
      { name: "Botões/Fechos", unit: "un", hasExpiry: false },
    ],
  },

  construcao: {
    id: "construcao",
    name: "Construção Civil",
    emoji: "🏗️",
    description: "Obras, materiais, mão-de-obra",
    icon: HardHat,
    color: "bg-orange-600",
    hasAppointments: false,
    hasDelivery: true,
    quickSaleMode: false,
    staffRoles: ["Mestre de obra", "Pedreiro", "Electricista", "Canalizador", "Servente"],
    kpiLabels: { mainMetric: "Projectos", secondaryMetric: "Custo vs Orçamento" },
    services: [
      { name: "Parede (m²)", defaultPrice: 800, costEstimate: 400 },
      { name: "Reboco (m²)", defaultPrice: 400, costEstimate: 150 },
      { name: "Pintura (m²)", defaultPrice: 300, costEstimate: 100 },
      { name: "Instalação eléctrica (ponto)", defaultPrice: 500, costEstimate: 200 },
      { name: "Canalização (ponto)", defaultPrice: 600, costEstimate: 250 },
      { name: "Laje (m²)", defaultPrice: 2500, costEstimate: 1500 },
      { name: "Fundações (m³)", defaultPrice: 3000, costEstimate: 1800 },
      { name: "Mão-de-obra diária", defaultPrice: 500 },
    ],
    expenseCategories: [
      { name: "Cimento", icon: "Package" },
      { name: "Areia/Cascalho", icon: "Mountain" },
      { name: "Ferro", icon: "Minus" },
      { name: "Tijolos/Blocos", icon: "Square" },
      { name: "Transporte material", icon: "Truck" },
      { name: "Ferramentas", icon: "Wrench" },
    ],
    stockCategories: [
      { name: "Cimento", unit: "sacos", hasExpiry: true },
      { name: "Areia", unit: "m³", hasExpiry: false },
      { name: "Blocos", unit: "un", hasExpiry: false },
      { name: "Ferro", unit: "barras", hasExpiry: false },
      { name: "Tintas", unit: "latas", hasExpiry: true },
    ],
  },

  electronica: {
    id: "electronica",
    name: "Loja de Electrónicos",
    emoji: "📱",
    description: "Telemóveis, acessórios, reparações",
    icon: Smartphone,
    color: "bg-blue-600",
    hasAppointments: true,
    hasDelivery: true,
    quickSaleMode: false,
    staffRoles: ["Vendedor", "Técnico reparação", "Caixa"],
    kpiLabels: { mainMetric: "Unidades Vendidas", secondaryMetric: "Margem Média" },
    services: [
      { name: "Smartphone (novo)", defaultPrice: 8000, costEstimate: 5500 },
      { name: "Smartphone (usado)", defaultPrice: 4000, costEstimate: 2500 },
      { name: "Capinha/Protector", defaultPrice: 200, costEstimate: 50 },
      { name: "Carregador", defaultPrice: 300, costEstimate: 100 },
      { name: "Auriculares", defaultPrice: 500, costEstimate: 150 },
      { name: "Reparação ecrã", defaultPrice: 2500, durationMinutes: 120, costEstimate: 1200 },
      { name: "Reparação bateria", defaultPrice: 1500, durationMinutes: 60, costEstimate: 600 },
      { name: "Reparação software", defaultPrice: 500, durationMinutes: 30, costEstimate: 0 },
      { name: "Recarga/Crédito", defaultPrice: 100, costEstimate: 90 },
    ],
    expenseCategories: [
      { name: "Compra stock", icon: "ShoppingCart" },
      { name: "Peças reparação", icon: "Cog" },
      { name: "Renda", icon: "Home" },
      { name: "Electricidade", icon: "Zap" },
      { name: "Marketing", icon: "Megaphone" },
    ],
    stockCategories: [
      { name: "Telemóveis", unit: "un", hasExpiry: false },
      { name: "Acessórios", unit: "un", hasExpiry: false },
      { name: "Peças reparação", unit: "un", hasExpiry: false },
      { name: "Recargas", unit: "un", hasExpiry: false },
    ],
  },

  estetica: {
    id: "estetica",
    name: "Estética / Spa",
    emoji: "💅",
    description: "Tratamentos, massagens, bem-estar",
    icon: Sparkles,
    color: "bg-rose-500",
    hasAppointments: true,
    hasDelivery: false,
    quickSaleMode: false,
    staffRoles: ["Esteticista", "Massagista", "Recepcionista"],
    kpiLabels: { mainMetric: "Tratamentos", secondaryMetric: "Receita/Sessão" },
    services: [
      { name: "Massagem relaxante", defaultPrice: 1500, durationMinutes: 60, costEstimate: 200 },
      { name: "Massagem desportiva", defaultPrice: 2000, durationMinutes: 90, costEstimate: 250 },
      { name: "Limpeza de pele", defaultPrice: 1000, durationMinutes: 60, costEstimate: 150 },
      { name: "Peeling corporal", defaultPrice: 1200, durationMinutes: 45, costEstimate: 180 },
      { name: "Depilação", defaultPrice: 800, durationMinutes: 30, costEstimate: 50 },
      { name: "Manicure + Pedicure", defaultPrice: 700, durationMinutes: 75, costEstimate: 80 },
      { name: "Tratamento capilar", defaultPrice: 1500, durationMinutes: 90, costEstimate: 200 },
      { name: "Pacote spa (2h)", defaultPrice: 3500, durationMinutes: 120, costEstimate: 400 },
    ],
    expenseCategories: [
      { name: "Produtos tratamento", icon: "Droplets" },
      { name: "Toalhas/Roupa", icon: "Shirt" },
      { name: "Óleos essenciais", icon: "Droplet" },
      { name: "Electricidade", icon: "Zap" },
      { name: "Renda", icon: "Home" },
    ],
    stockCategories: [
      { name: "Óleos/Cremes", unit: "un", hasExpiry: true },
      { name: "Toalhas", unit: "un", hasExpiry: false },
      { name: "Produtos depilação", unit: "un", hasExpiry: true },
      { name: "Descartáveis", unit: "un", hasExpiry: false },
    ],
  },

  generico: {
    id: "generico",
    name: "Outro Negócio",
    emoji: "📦",
    description: "Configuração personalizável",
    icon: Package,
    color: "bg-gray-500",
    hasAppointments: false,
    hasDelivery: false,
    quickSaleMode: false,
    staffRoles: ["Gerente", "Vendedor", "Assistente"],
    kpiLabels: { mainMetric: "Vendas", secondaryMetric: "Margem" },
    services: [
      { name: "Produto/Serviço 1", defaultPrice: 500 },
      { name: "Produto/Serviço 2", defaultPrice: 1000 },
      { name: "Produto/Serviço 3", defaultPrice: 1500 },
    ],
    expenseCategories: [
      { name: "Stock/Material", icon: "Package" },
      { name: "Renda", icon: "Home" },
      { name: "Electricidade", icon: "Zap" },
      { name: "Transporte", icon: "Car" },
      { name: "Marketing", icon: "Megaphone" },
    ],
    stockCategories: [
      { name: "Produtos", unit: "un", hasExpiry: false },
    ],
  },
};

export function getTemplate(id: string): TemplateDefinition {
  return BUSINESS_TEMPLATES[id] || BUSINESS_TEMPLATES.generico!;
}

export function getTemplateList(): TemplateDefinition[] {
  return Object.values(BUSINESS_TEMPLATES);
}
