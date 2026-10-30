import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity, ArrowDownRight, ArrowUpRight, BedDouble, Bell, CalendarDays, Check,
  ChevronDown, ChevronLeft, ChevronRight, CircleHelp, ClipboardList, Clock3,
  Download, FlaskConical, LayoutDashboard, Menu, Moon, MoreHorizontal, Plus,
  Search, Settings, ShieldCheck, Sun, Users, Wallet, X,
} from "lucide-react";
import {
  Area, AreaChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer,
  Tooltip, XAxis, YAxis,
} from "recharts";

type Page = "Dashboard" | "Take New Appointment" | "Take Lab Order" | "Lab Order Records" | "Prescription" | "App Users" | "Master Data" | "Patients & EMR" | "Doctor Scheduling" | "IPD & Bed Management" | "Billing & Invoicing" | "Pharmacy & Inventory" | "Reports & Analytics" | "Emergency & Casualty" | "Radiology & Imaging" | "Operation Theatre" | "Nurse Station" | "Blood Bank" | "Ambulance & Transport" | "HR & Payroll" | "Accounts & Finance" | "Notifications" | "Patient Portal" | "Queue Display" | "Audit & Security" | "Branches & Languages";
type LabStatus = "Pending" | "Sample Collected" | "Completed";
type PaymentStatus = "Paid" | "Unpaid" | "Due";

type LabOrder = {
  invoice: string;
  date: string;
  patient: string;
  phone: string;
  total: number;
  payment: PaymentStatus;
  status: LabStatus;
};

const formatSeedDate = (daysAgo: number) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return new Intl.DateTimeFormat("en-US", { day: "2-digit", month: "short", year: "numeric" }).format(date);
};

const navigation: { name: string; icon: typeof LayoutDashboard; items?: Page[] }[] = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Outdoor (OPD)", icon: CalendarDays, items: ["Take New Appointment", "Doctor Scheduling"] },
  { name: "Lab Module", icon: FlaskConical, items: ["Take Lab Order", "Lab Order Records"] },
  { name: "Prescription", icon: ClipboardList },
  { name: "App Users", icon: Users },
  { name: "Master Data", icon: Settings },
  { name: "More", icon: MoreHorizontal, items: ["Patients & EMR", "IPD & Bed Management", "Billing & Invoicing", "Pharmacy & Inventory", "Reports & Analytics", "Emergency & Casualty", "Radiology & Imaging", "Operation Theatre", "Nurse Station", "Blood Bank", "Ambulance & Transport", "HR & Payroll", "Accounts & Finance", "Notifications", "Patient Portal", "Queue Display", "Audit & Security", "Branches & Languages"] },
];

const initialOrders: LabOrder[] = [
  { invoice: "INV-240518", date: formatSeedDate(0), patient: "Olivia Rhye", phone: "+1 202 555 0148", total: 185, payment: "Paid", status: "Completed" },
  { invoice: "INV-240517", date: formatSeedDate(0), patient: "Phoenix Baker", phone: "+1 202 555 0172", total: 320, payment: "Due", status: "Sample Collected" },
  { invoice: "INV-240516", date: formatSeedDate(1), patient: "Lana Steiner", phone: "+1 202 555 0194", total: 95, payment: "Unpaid", status: "Pending" },
  { invoice: "INV-240515", date: formatSeedDate(1), patient: "Demi Wilkinson", phone: "+1 202 555 0186", total: 240, payment: "Paid", status: "Completed" },
  { invoice: "INV-240514", date: formatSeedDate(2), patient: "Candice Wu", phone: "+1 202 555 0129", total: 155, payment: "Due", status: "Pending" },
  { invoice: "INV-240513", date: formatSeedDate(2), patient: "Natali Craig", phone: "+1 202 555 0163", total: 410, payment: "Paid", status: "Sample Collected" },
];

const revenueData = [
  { day: "Mon", revenue: 4200, expense: 2600 }, { day: "Tue", revenue: 5100, expense: 3100 },
  { day: "Wed", revenue: 4600, expense: 2800 }, { day: "Thu", revenue: 6200, expense: 3900 },
  { day: "Fri", revenue: 5700, expense: 3200 }, { day: "Sat", revenue: 7100, expense: 4100 },
  { day: "Sun", revenue: 6500, expense: 3700 },
];
const flowData = [
  { day: "Mon", patients: 42 }, { day: "Tue", patients: 58 }, { day: "Wed", patients: 49 },
  { day: "Thu", patients: 72 }, { day: "Fri", patients: 61 }, { day: "Sat", patients: 84 },
  { day: "Sun", patients: 68 },
];
const departmentData = [
  { name: "General", value: 38, color: "#72baff" }, { name: "Cardiology", value: 24, color: "#cda4f5" },
  { name: "Neurology", value: 20, color: "#7cdbc4" }, { name: "Pediatrics", value: 18, color: "#ffca86" },
];
const services = [
  { name: "Complete Blood Count (CBC)", category: "Pathology", rate: 45 },
  { name: "Lipid Profile", category: "Pathology", rate: 65 },
  { name: "Thyroid Profile (T3, T4, TSH)", category: "Pathology", rate: 85 },
  { name: "ECG — 12 Lead", category: "Cardiology", rate: 55 },
  { name: "MRI Brain", category: "Neurology", rate: 420 },
  { name: "Chest X-Ray", category: "Imaging", rate: 80 },
];
const doctors = [
  { name: "Dr. Sarah Chen", specialty: "Cardiologist", available: "Available · 9:00 AM – 2:00 PM" },
  { name: "Dr. James Wilson", specialty: "General Physician", available: "Available · 10:00 AM – 4:00 PM" },
  { name: "Dr. Aisha Patel", specialty: "Neurologist", available: "Available · 8:00 AM – 1:00 PM" },
];

const today = new Date();
const todayInput = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
const formattedToday = new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }).format(today);
const shortToday = new Intl.DateTimeFormat("en-US", { day: "2-digit", month: "short", year: "numeric" }).format(today);
const money = (amount: number) => `$${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

function App() {
  const [page, setPage] = useState<Page>("Dashboard");
  const [dark, setDark] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileNav, setMobileNav] = useState(false);
  const [orders, setOrders] = useState(initialOrders);
  const [notice, setNotice] = useState("");
  const [search, setSearch] = useState("");
  const [selectedRange, setSelectedRange] = useState("This week");

  const showNotice = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3200);
  };
  const changePage = (next: Page) => {
    setPage(next);
    setOpenMenu(null);
    setMobileNav(false);
    setSearch("");
  };
  const addOrder = (order: LabOrder) => {
    setOrders((current) => [order, ...current]);
    changePage("Lab Order Records");
    showNotice("Lab order created successfully");
  };

  return (
    <div className={`app-shell${dark ? " dark" : ""}`}>
      <header className="topbar">
        <button className="mobile-menu icon-button" aria-label="Toggle navigation" onClick={() => setMobileNav((value) => !value)}><Menu size={19} /></button>
        <button className="brand" onClick={() => changePage("Dashboard")} aria-label="Careflow home">
          <span className="brand-mark"><Activity size={19} strokeWidth={2.6} /></span>
          <span>careflow<span className="brand-period">.</span></span>
        </button>
        <div className="topbar-actions">
          <label className="searchbox">
            <Search size={16} />
            <input aria-label="Search patients, invoices, or records" placeholder="Search anything..." value={search} onChange={(event) => setSearch(event.target.value)} />
            <kbd>⌘ K</kbd>
          </label>
          <button className="icon-button theme-toggle" aria-label={dark ? "Switch to light mode" : "Switch to dark mode"} onClick={() => setDark((value) => !value)}>{dark ? <Sun size={18} /> : <Moon size={18} />}</button>
          <button className="icon-button notification-button" aria-label="Notifications" onClick={() => showNotice("You're all caught up on notifications")}><Bell size={18} /><i /></button>
          <button className="icon-button" aria-label="Settings" onClick={() => changePage("Master Data")}><Settings size={18} /></button>
          <button className="profile-button" onClick={() => showNotice("Signed in as Alex Morgan · Administrator")}>
            <span className="avatar">AM</span><span className="profile-copy"><b>Alex Morgan</b><small>Administrator</small></span><ChevronDown size={15} />
          </button>
        </div>
      </header>

      <section className="hero-head">
        <div className="dna-art" aria-hidden="true">
          <svg viewBox="0 0 640 220" fill="none">
            <path d="M56 12C300 44 330 176 584 208M56 208C300 176 330 44 584 12" stroke="url(#dna)" strokeWidth="2" />
            <path d="M117 25L117 195M176 44L176 176M237 67L237 153M297 91L297 129M358 91L358 129M419 67L419 153M480 44L480 176M539 25L539 195" stroke="url(#dna)" strokeWidth="1.5" />
            <defs><linearGradient id="dna" x1="56" y1="110" x2="584" y2="110" gradientUnits="userSpaceOnUse"><stop stopColor="#79C1FF" /><stop offset="1" stopColor="#D3ACF5" /></linearGradient></defs>
          </svg>
        </div>
        <div className="hero-title">
          <span className="eyebrow"><span className="live-dot" /> HOSPITAL MANAGEMENT PLATFORM</span>
          <h1>{page === "Dashboard" ? "Good morning, Alex" : page}</h1>
          <p>{page === "Dashboard" ? "Hi, Alex! Welcome back. Here's what's happening at your hospital today." : pageDescription(page)}</p>
        </div>
        <div className="date-chip"><CalendarDays size={15} /><span>{formattedToday}</span><ChevronDown size={14} /></div>
      </section>

      <nav className={`nav-wrap${mobileNav ? " nav-open" : ""}`} aria-label="Main navigation">
        <div className="nav-pills">
          {navigation.map((item) => {
            const active = item.name === "Dashboard" ? page === "Dashboard" : item.items?.includes(page) || item.name === page;
            return item.items ? (
              <div className="nav-dropdown" key={item.name}>
                <button className={`nav-pill${active ? " active" : ""}`} onClick={() => setOpenMenu(openMenu === item.name ? null : item.name)} aria-expanded={openMenu === item.name}>
                  <item.icon size={16} /><span>{item.name}</span><ChevronDown size={13} />
                </button>
                <AnimatePresence>
                  {openMenu === item.name && <motion.div className="dropdown-menu" initial={{ opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 7 }}>
                    {item.items.map((subitem) => <button key={subitem} onClick={() => changePage(subitem)} className={page === subitem ? "selected" : ""}>{subitem}</button>)}
                  </motion.div>}
                </AnimatePresence>
              </div>
            ) : (
              <button key={item.name} className={`nav-pill${active ? " active" : ""}`} onClick={() => changePage(item.name as Page)}><item.icon size={16} /><span>{item.name}</span></button>
            );
          })}
        </div>
      </nav>

      <main className="main-content">
        <AnimatePresence mode="wait">
          <motion.div key={page} className="page-transition" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.2 }}>
            {page === "Dashboard" && <DashboardPage range={selectedRange} setRange={setSelectedRange} changePage={changePage} orders={orders} />}
            {page === "Take New Appointment" && <AppointmentPage onSubmit={() => { showNotice("Appointment confirmed and token assigned"); changePage("Dashboard"); }} />}
            {page === "Take Lab Order" && <LabOrderPage onSubmit={addOrder} />}
            {page === "Lab Order Records" && <LabRecordsPage orders={orders} setOrders={setOrders} search={search} setSearch={setSearch} showNotice={showNotice} changePage={changePage} />}
            {!["Dashboard", "Take New Appointment", "Take Lab Order", "Lab Order Records"].includes(page) && <ModulePage page={page} changePage={changePage} showNotice={showNotice} />}
          </motion.div>
        </AnimatePresence>
      </main>
      <footer className="footer"><span>© {today.getFullYear()} Careflow Health Systems</span><span><ShieldCheck size={14} /> Your patient data is secure and encrypted</span><button onClick={() => showNotice("Help center is coming soon")}>Help center <CircleHelp size={14} /></button></footer>
      <AnimatePresence>{notice && <motion.div className="toast" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 14 }}><span className="toast-check"><Check size={15} /></span>{notice}<button onClick={() => setNotice("")} aria-label="Dismiss notification"><X size={15} /></button></motion.div>}</AnimatePresence>
    </div>
  );
}

function pageDescription(page: Page) {
  const descriptions: Partial<Record<Page, string>> = {
    "Take New Appointment": "Schedule an outpatient visit and get your patient in front of the right specialist.",
    "Take Lab Order": "Create a diagnostic order and generate an invoice for your patient.",
    "Lab Order Records": "Track diagnostic orders, sample status, and outstanding payments.",
    "Prescription": "Create, review, and manage patient prescriptions.",
    "App Users": "Manage staff accounts, roles, and module permissions.",
    "Master Data": "Configure the departments, services, and clinical settings for your hospital.",
    "Patients & EMR": "Patient profiles, medical history, allergies, and visit timelines.",
    "Doctor Scheduling": "Plan doctor shifts, appointments, and availability.",
    "IPD & Bed Management": "Manage admissions, ward capacity, transfers, and bed status.",
    "Billing & Invoicing": "Review hospital charges, payments, and outstanding balances.",
    "Pharmacy & Inventory": "Monitor medicines, stock levels, batches, and expiry dates.",
    "Reports & Analytics": "Explore operational and financial performance across your hospital.",
    "Emergency & Casualty": "Quickly register, triage, and coordinate emergency patients.",
    "Radiology & Imaging": "Schedule imaging, attach studies, and manage radiology reports.",
    "Operation Theatre": "Coordinate operating-room schedules, teams, and procedure notes.",
    "Nurse Station": "Track medication rounds, patient vitals, and nursing tasks.",
    "Blood Bank": "Monitor blood-group inventory, donor records, and transfusion requests.",
    "Ambulance & Transport": "Coordinate ambulance availability, dispatch, and patient transport.",
    "HR & Payroll": "Manage staff attendance, shifts, leave, and payroll records.",
    "Accounts & Finance": "Review ledgers, daily closing, expenses, and financial reports.",
    "Notifications": "Configure appointment, report-ready, and payment reminders.",
    "Patient Portal": "Give patients access to appointments, reports, prescriptions, and bills.",
    "Queue Display": "Show live token progress on waiting-room display screens.",
    "Audit & Security": "Review activity history, access controls, and security settings.",
    "Branches & Languages": "Configure hospital branches, localization, and print templates.",
  };
  return descriptions[page] ?? "Your hospital operations, all in one place.";
}

function SectionHeading({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
  return <div className="section-heading"><div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div>{action}</div>;
}

function DashboardPage({ range, setRange, changePage, orders }: { range: string; setRange: (value: string) => void; changePage: (page: Page) => void; orders: LabOrder[] }) {
  return <>
    <div className="dashboard-heading">
      <div><h2>Overview</h2><p>A snapshot of your hospital's performance today.</p></div>
      <button className="button button-outline" onClick={() => window.print()}><Download size={16} /> Export report</button>
    </div>
    <div className="stats-grid">
      <StatCard title="Patients today" value="248" change="+12.8%" trend="up" icon={<Users size={18} />} color="blue" detail={<><span>Admissions <b>18</b></span><span>In treatment <b>146</b></span><span>Discharged <b>24</b></span></>} />
      <StatCard title="Collection today" value="$12,840" change="+8.2%" trend="up" icon={<Wallet size={18} />} color="purple" detail={<><span>Clinic <b>$8,240</b></span><span>Laboratory <b>$4,600</b></span><span>Total collected <b>$12,840</b></span></>} />
      <StatCard title="Expense today" value="$4,280" change="-3.1%" trend="down" icon={<Activity size={18} />} color="orange" detail={<><span>This month <b>$86,420</b></span><span>Last month <b>$91,280</b></span><span>Budget used <b>68%</b></span></>} />
      <StatCard title="Due not collected" value="$2,460" change="12 invoices" trend="neutral" icon={<ClipboardList size={18} />} color="rose" detail={<><span>Over 30 days <b>$640</b></span><span>Due this week <b>$1,180</b></span><span>Open invoices <b>12</b></span></>} />
    </div>
    <div className="dashboard-charts">
      <section className="panel chart-panel revenue-panel">
        <div className="panel-heading"><div><h3>Revenue vs. expenses</h3><p>Keep an eye on your financial health</p></div><select value={range} onChange={(event) => setRange(event.target.value)} aria-label="Chart date range"><option>This week</option><option>This month</option><option>This year</option></select></div>
        <div className="chart-legend"><span><i className="legend-blue" /> Revenue</span><span><i className="legend-purple" /> Expenses</span><strong>$42,680 <small>total revenue</small></strong></div>
        <div className="chart-area"><ResponsiveContainer width="100%" height="100%"><AreaChart data={revenueData} margin={{ top: 8, right: 4, left: -20, bottom: 0 }}><defs><linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#74baff" stopOpacity={0.2} /><stop offset="95%" stopColor="#74baff" stopOpacity={0} /></linearGradient><linearGradient id="expenseFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#cda4f5" stopOpacity={0.18} /><stop offset="95%" stopColor="#cda4f5" stopOpacity={0} /></linearGradient></defs><CartesianGrid strokeDasharray="3 5" vertical={false} stroke="var(--line)" /><XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "var(--muted)", fontSize: 12 }} dy={8} /><YAxis axisLine={false} tickLine={false} tick={{ fill: "var(--muted)", fontSize: 11 }} tickFormatter={(value: number) => `$${value / 1000}k`} /><Tooltip formatter={(value) => money(Number(value))} contentStyle={{ borderRadius: 12, border: "1px solid var(--line)", background: "var(--card)", fontFamily: "Urbanist" }} /><Area type="monotone" dataKey="revenue" stroke="#6ab8ff" strokeWidth={2.5} fill="url(#revenueFill)" /><Area type="monotone" dataKey="expense" stroke="#cfa3f6" strokeWidth={2.5} fill="url(#expenseFill)" /></AreaChart></ResponsiveContainer></div>
      </section>
      <section className="panel chart-panel patient-panel">
        <div className="panel-heading"><div><h3>Patient flow</h3><p>Patients seen over the last 7 days</p></div><button className="subtle-icon" aria-label="More patient flow options"><MoreHorizontal size={19} /></button></div>
        <div className="flow-summary"><b>434</b><span>total visits this week</span><em><ArrowUpRight size={13} /> 10.4%</em></div>
        <div className="chart-area small-chart"><ResponsiveContainer width="100%" height="100%"><AreaChart data={flowData} margin={{ top: 10, right: 3, left: -26, bottom: 0 }}><defs><linearGradient id="flowFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#a5d6ff" stopOpacity={0.36} /><stop offset="100%" stopColor="#a5d6ff" stopOpacity={0} /></linearGradient></defs><CartesianGrid strokeDasharray="3 5" vertical={false} stroke="var(--line)" /><XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "var(--muted)", fontSize: 11 }} dy={8} /><YAxis axisLine={false} tickLine={false} tick={{ fill: "var(--muted)", fontSize: 10 }} /><Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--line)", background: "var(--card)", fontFamily: "Urbanist" }} /><Area type="monotone" dataKey="patients" stroke="#6ab8ff" strokeWidth={2.5} fill="url(#flowFill)" /></AreaChart></ResponsiveContainer></div>
      </section>
    </div>
    <div className="dashboard-bottom">
      <section className="panel departments-panel">
        <div className="panel-heading"><div><h3>Department load</h3><p>Patients currently being seen</p></div><button className="text-button" onClick={() => changePage("Reports & Analytics")}>View report <ChevronRight size={15} /></button></div>
        <div className="department-content"><div className="donut-wrap"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={departmentData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={66} paddingAngle={4} stroke="none">{departmentData.map((item) => <Cell key={item.name} fill={item.color} />)}</Pie><Tooltip contentStyle={{ borderRadius: 10, border: "1px solid var(--line)", background: "var(--card)", fontFamily: "Urbanist" }} /></PieChart></ResponsiveContainer><div className="donut-center"><b>126</b><small>patients</small></div></div><div className="department-legend">{departmentData.map((item) => <div key={item.name}><span><i style={{ background: item.color }} />{item.name}</span><b>{item.value}%</b></div>)}</div></div>
      </section>
      <section className="panel beds-panel">
        <div className="panel-heading"><div><h3>Available beds</h3><p>Live occupancy across all wards</p></div><BedDouble size={18} className="heading-icon" /></div>
        <div className="bed-total"><b>32</b><span>of 86 beds available</span><span className="occupancy"><i /> 63% occupied</span></div>
        <div className="bed-rows">{[["General", 14, 36], ["ICU", 5, 16], ["Private", 9, 22], ["Emergency", 4, 12]].map(([ward, free, total]) => <div className="bed-row" key={ward}><span>{ward}</span><div className="bed-track"><i style={{ width: `${(Number(free) / Number(total)) * 100}%` }} /></div><b>{free}<small>/{total}</small></b></div>)}</div>
      </section>
      <section className="panel lab-summary-panel">
        <div className="panel-heading"><div><h3>Lab reports today</h3><p>Test results and samples</p></div><button className="text-button" onClick={() => changePage("Lab Order Records")}>View all <ChevronRight size={15} /></button></div>
        <div className="lab-status-list"><div><span className="status-icon pending"><Clock3 size={15} /></span><span>Pending</span><b>{orders.filter((order) => order.status === "Pending").length + 8}</b></div><div><span className="status-icon collected"><FlaskConical size={15} /></span><span>Sample collected</span><b>{orders.filter((order) => order.status === "Sample Collected").length + 14}</b></div><div><span className="status-icon complete"><Check size={15} /></span><span>Completed</span><b>{orders.filter((order) => order.status === "Completed").length + 32}</b></div></div>
        <button className="button button-light full-button" onClick={() => changePage("Take Lab Order")}><Plus size={16} /> Create lab order</button>
      </section>
    </div>
    <div className="quick-actions"><span>Quick actions</span><button onClick={() => changePage("Take New Appointment")}><CalendarDays size={15} /> New appointment</button><button onClick={() => changePage("Take Lab Order")}><FlaskConical size={15} /> Take lab order</button><button onClick={() => changePage("Patients & EMR")}><Users size={15} /> Register patient</button></div>
  </>;
}

function StatCard({ title, value, change, trend, icon, color, detail }: { title: string; value: string; change: string; trend: "up" | "down" | "neutral"; icon: React.ReactNode; color: string; detail: React.ReactNode }) {
  return <motion.section className="panel stat-card" whileHover={{ y: -2 }} transition={{ duration: 0.18 }}>
    <div className="stat-top"><span className={`stat-icon ${color}`}>{icon}</span><span className={`trend ${trend}`}>{trend === "up" ? <ArrowUpRight size={13} /> : trend === "down" ? <ArrowDownRight size={13} /> : null}{change}</span></div>
    <div className="stat-value">{value}</div><div className="stat-title">{title}</div>
    <div className="stat-details">{detail}</div>
  </motion.section>;
}

function AppointmentPage({ onSubmit }: { onSubmit: () => void }) {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState(todayInput);
  const [gender, setGender] = useState("");
  const [consultationType, setConsultationType] = useState("New consultation");
  const [fee, setFee] = useState(85);
  const [age, setAge] = useState({ years: "", months: "", days: "" });
  const foundPatient = phone.replace(/\D/g, "").length >= 10;

  return <div className="workflow-layout">
    <div className="workflow-main">
      <SectionHeading title="Appointment details" subtitle="Fill in the patient and consultation information to reserve a visit." />
      <section className="panel form-panel">
        <div className="form-section-title"><span className="step-number">01</span><div><h3>Patient information</h3><p>Enter a phone number to check for existing patient records.</p></div></div>
        <div className="form-grid">
          <label className="field"><span>Phone number <b className="required">*</b></span><div className="input-with-prefix"><span>+1</span><input required value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="(555) 000-0000" inputMode="tel" /></div>{foundPatient && <small className="field-hint success-hint"><Check size={13} /> Existing patient found — ID PT-10482</small>}</label>
          <label className="field"><span>Patient name <b className="required">*</b></span><input required value={name || (foundPatient ? "Olivia Rhye" : "")} onChange={(event) => setName(event.target.value)} placeholder="Full name" /></label>
          <div className="field age-field"><span>Age</span><div className="age-inputs">{(["years", "months", "days"] as const).map((unit) => <label key={unit}><input type="number" min="0" max={unit === "years" ? 120 : unit === "months" ? 11 : 30} placeholder="00" value={age[unit]} onChange={(event) => setAge({ ...age, [unit]: event.target.value })} /><small>{unit === "years" ? "Years" : unit === "months" ? "Months" : "Days"}</small></label>)}</div></div>
          <label className="field"><span>Gender</span><select value={gender} onChange={(event) => setGender(event.target.value)}><option value="" disabled>Select gender</option><option>Female</option><option>Male</option><option>Non-binary</option><option>Prefer not to say</option></select></label>
        </div>
      </section>
      <section className="panel form-panel">
        <div className="form-section-title"><span className="step-number">02</span><div><h3>Consultation details</h3><p>Choose the doctor and a date that works for your patient.</p></div></div>
        <div className="form-grid">
          <label className="field field-wide"><span>Assign doctor <b className="required">*</b></span><select required value={doctor} onChange={(event) => { setDoctor(event.target.value); setFee(event.target.value ? 85 : 0); }}><option value="">Select a doctor</option>{doctors.map((item) => <option value={item.name} key={item.name}>{item.name} — {item.specialty}</option>)}</select>{doctor && <small className="field-hint"><span className="live-dot" /> {doctors.find((item) => item.name === doctor)?.available}</small>}</label>
          <label className="field"><span>Visit date</span><input type="date" value={date} onChange={(event) => setDate(event.target.value)} /></label>
          <label className="field"><span>Consultation type</span><select value={consultationType} onChange={(event) => setConsultationType(event.target.value)}><option>New consultation</option><option>Follow-up</option><option>Teleconsultation</option></select></label>
        </div>
      </section>
      <div className="form-actions"><button className="button button-outline" onClick={() => { setPhone(""); setName(""); setDoctor(""); setDate(todayInput); setGender(""); setConsultationType("New consultation"); setFee(85); setAge({ years: "", months: "", days: "" }); }}>Reset form</button><button className="button button-primary" disabled={!doctor || !date || !phone.trim() || (!name.trim() && !foundPatient)} onClick={onSubmit}><Check size={16} /> Confirm appointment</button></div>
    </div>
    <aside className="workflow-aside">
      <section className="panel token-card"><div className="token-top"><span className="stat-icon blue"><TicketIcon /></span><span className="live-badge"><i /> Live queue</span></div><h3>Patient token</h3><p>Estimated current serial / next patient token</p><div className="token-number">#<b>024</b></div><div className="token-foot"><span>Today’s queue</span><b>18 patients ahead</b></div><div className="queue-track"><i /></div><div className="queue-times"><span>09:00 AM</span><span>~25 min wait</span></div></section>
      <section className="panel fee-card"><h3>Payment summary</h3><p>Consultation fee details</p><div className="fee-row"><span>Consultation fee</span><b>{money(fee)}</b></div><div className="fee-row"><span>Registration</span><b>$15.00</b></div><div className="fee-row"><span>Tax (5%)</span><b>{money((fee + 15) * 0.05)}</b></div><div className="fee-total"><span>Total payable</span><b>{money((fee + 15) * 1.05)}</b></div><span className="secure-note"><ShieldCheck size={14} /> Secure payment at reception</span></section>
      <div className="info-note"><span><ClipboardList size={17} /></span><p><b>Good to know</b>Assigning a serial automatically links this patient to the doctor and their prescription record.</p></div>
    </aside>
  </div>;
}

function TicketIcon() { return <span className="ticket-glyph">#</span>; }

function LabOrderPage({ onSubmit }: { onSubmit: (order: LabOrder) => void }) {
  const [source, setSource] = useState("New Patient");
  const [category, setCategory] = useState("All services");
  const [query, setQuery] = useState("");
  const [patient, setPatient] = useState("");
  const [phone, setPhone] = useState("");
  const [discount, setDiscount] = useState(0);
  const [payment, setPayment] = useState("Pay at reception");
  const [cart, setCart] = useState<{ name: string; rate: number; quantity: number }[]>([]);
  const subtotal = cart.reduce((sum, item) => sum + item.rate * item.quantity, 0);
  const total = Math.max(0, subtotal - discount);
  const filteredServices = services.filter((service) => (category === "All services" || service.category === category) && service.name.toLowerCase().includes(query.toLowerCase()));
  const addService = (service: typeof services[number]) => setCart((current) => {
    const existing = current.find((item) => item.name === service.name);
    return existing ? current.map((item) => item.name === service.name ? { ...item, quantity: item.quantity + 1 } : item) : [...current, { name: service.name, rate: service.rate, quantity: 1 }];
  });
  const setQuantity = (name: string, quantity: number) => setCart((current) => quantity <= 0 ? current.filter((item) => item.name !== name) : current.map((item) => item.name === name ? { ...item, quantity } : item));

  return <div className="workflow-layout lab-workflow">
    <div className="workflow-main">
      <SectionHeading title="Create lab order" subtitle="Select tests and create an invoice for a new or existing patient." />
      <section className="panel form-panel">
        <div className="form-section-title"><span className="step-number">01</span><div><h3>Patient & order source</h3><p>Choose where this lab order is coming from.</p></div></div>
        <div className="source-options">{["New Patient", "Old Patient", "Prescription Patient"].map((item) => <button key={item} onClick={() => setSource(item)} className={source === item ? "source-active" : ""}><span className="radio-dot" />{item}</button>)}</div>
        {source === "Prescription Patient" && <label className="field prescription-search"><span>Search prescription</span><div className="search-input"><Search size={16} /><input placeholder="Search by prescription number or patient..." value={query} onChange={(event) => setQuery(event.target.value)} /></div></label>}
        <div className="form-grid patient-order-grid">
          <label className="field"><span>Patient name <b className="required">*</b></span><input value={patient} onChange={(event) => setPatient(event.target.value)} placeholder="Enter patient's full name" /></label>
          <label className="field"><span>Phone number <b className="required">*</b></span><div className="input-with-prefix"><span>+1</span><input value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="(555) 000-0000" inputMode="tel" /></div></label>
        </div>
      </section>
      <section className="panel service-panel">
        <div className="panel-heading"><div><h3>Select services</h3><p>Choose from our diagnostic test catalog.</p></div><span className="service-count">{services.length} services</span></div>
        <div className="service-toolbar"><div className="search-input"><Search size={16} /><input placeholder="Search tests..." value={query} onChange={(event) => setQuery(event.target.value)} /></div><select value={category} onChange={(event) => setCategory(event.target.value)} aria-label="Filter by service category"><option>All services</option>{["Pathology", "Cardiology", "Neurology", "Imaging"].map((value) => <option key={value}>{value}</option>)}</select></div>
        <div className="service-list">{filteredServices.map((service) => <div className="service-row" key={service.name}><span className="service-icon"><FlaskConical size={17} /></span><div className="service-name"><b>{service.name}</b><small>{service.category}</small></div><b className="service-rate">{money(service.rate)}</b><button className="add-service" onClick={() => addService(service)} aria-label={`Add ${service.name}`}><Plus size={16} /></button></div>)}{filteredServices.length === 0 && <div className="empty-search">No services match your search.</div>}</div>
      </section>
    </div>
    <aside className="workflow-aside order-aside">
      <section className="panel order-summary">
        <div className="panel-heading"><div><h3>Order summary</h3><p>{cart.length} {cart.length === 1 ? "test" : "tests"} selected</p></div><span className="summary-bag"><FlaskConical size={17} /></span></div>
        <div className="cart-list">{cart.length === 0 ? <div className="cart-empty"><span><ClipboardList size={20} /></span><b>No tests added yet</b><small>Choose a service to add it to this order.</small></div> : cart.map((item) => <div className="cart-item" key={item.name}><div><b>{item.name}</b><small>{money(item.rate)} each</small></div><div className="quantity-control"><button aria-label={`Remove one ${item.name}`} onClick={() => setQuantity(item.name, item.quantity - 1)}>−</button><span>{item.quantity}</span><button aria-label={`Add one ${item.name}`} onClick={() => setQuantity(item.name, item.quantity + 1)}>+</button></div><b className="cart-price">{money(item.rate * item.quantity)}</b></div>)}</div>
        <div className="summary-totals"><div><span>Subtotal</span><b>{money(subtotal)}</b></div><label><span>Discount</span><div className="discount-field"><span>$</span><input type="number" min="0" max={subtotal} value={discount || ""} onChange={(event) => setDiscount(Math.min(subtotal, Number(event.target.value)))} placeholder="0.00" /></div></label><div className="total-line"><span>Total payable</span><b>{money(total)}</b></div></div>
        <label className="field payment-field"><span>Payment method</span><select value={payment} onChange={(event) => setPayment(event.target.value)}><option>Pay at reception</option><option>Cash</option><option>Credit card</option><option>Insurance / TPA</option></select></label>
        <button className="button button-primary full-button" disabled={!cart.length || !patient.trim() || phone.replace(/\D/g, "").length < 10} onClick={() => onSubmit({ invoice: `INV-${Date.now().toString().slice(-6)}`, date: shortToday, patient: patient.trim(), phone: phone.trim(), total, payment: payment === "Pay at reception" ? "Unpaid" : "Paid", status: "Pending" })}><ClipboardList size={16} /> Generate invoice</button>
        <small className="invoice-note"><ShieldCheck size={13} /> Invoice is securely stored in the patient's record.</small>
      </section>
    </aside>
  </div>;
}

function LabRecordsPage({ orders, setOrders, search, setSearch, showNotice, changePage }: { orders: LabOrder[]; setOrders: React.Dispatch<React.SetStateAction<LabOrder[]>>; search: string; setSearch: (value: string) => void; showNotice: (message: string) => void; changePage: (page: Page) => void }) {
  const [paymentFilter, setPaymentFilter] = useState("All payments");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [pageNumber, setPageNumber] = useState(1);
  const filtered = orders.filter((order) => `${order.invoice} ${order.patient} ${order.phone}`.toLowerCase().includes(search.toLowerCase()) && (paymentFilter === "All payments" || order.payment === paymentFilter) && (statusFilter === "All statuses" || order.status === statusFilter));
  const start = (pageNumber - 1) * 5;
  const visible = filtered.slice(start, start + 5);
  const updateOrder = (invoice: string, field: "payment" | "status") => setOrders((current) => current.map((order) => order.invoice === invoice ? {
    ...order,
    payment: field === "payment" ? "Paid" : order.payment,
    status: field === "status" ? (order.status === "Pending" ? "Sample Collected" : order.status === "Sample Collected" ? "Completed" : "Completed") : order.status,
  } : order));
  const downloadInvoice = async (order: LabOrder) => {
    const { jsPDF } = await import("jspdf");
    const pdf = new jsPDF();
    pdf.setFillColor(106, 184, 255);
    pdf.roundedRect(18, 18, 12, 12, 3, 3, "F");
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(12);
    pdf.text("+", 21.3, 26.4);
    pdf.setTextColor(44, 49, 55);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(19);
    pdf.text("Careflow Health Systems", 36, 27);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(112, 127, 142);
    pdf.setFontSize(10);
    pdf.text("LABORATORY INVOICE", 18, 48);
    pdf.setDrawColor(225, 232, 239);
    pdf.line(18, 53, 192, 53);
    pdf.setTextColor(44, 49, 55);
    pdf.setFontSize(11);
    pdf.text(`Invoice: ${order.invoice}`, 18, 67);
    pdf.text(`Date: ${order.date}`, 18, 76);
    pdf.text(`Patient: ${order.patient}`, 18, 91);
    pdf.text(`Phone: ${order.phone}`, 18, 100);
    pdf.setFillColor(244, 248, 252);
    pdf.roundedRect(18, 116, 174, 28, 3, 3, "F");
    pdf.setTextColor(105, 121, 137);
    pdf.setFontSize(10);
    pdf.text("TOTAL DUE", 26, 128);
    pdf.setTextColor(44, 49, 55);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(16);
    pdf.text(money(order.total), 26, 138);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    pdf.text(`Payment: ${order.payment}`, 18, 160);
    pdf.text(`Order status: ${order.status}`, 18, 169);
    pdf.setTextColor(130, 144, 158);
    pdf.setFontSize(9);
    pdf.text("Thank you for choosing Careflow. Please contact reception with any questions.", 18, 190);
    pdf.save(`${order.invoice}.pdf`);
    showNotice("Invoice downloaded");
  };
  return <>
    <div className="dashboard-heading records-heading"><div><h2>Lab order records</h2><p>Manage patient orders, payments, and report status.</p></div><button className="button button-primary" onClick={() => changePage("Take Lab Order")}><Plus size={16} /> New lab order</button></div>
    <div className="records-kpis"><div className="panel records-kpi"><span className="stat-icon blue"><FlaskConical size={17} /></span><div><b>{orders.length}</b><small>Total orders</small></div></div><div className="panel records-kpi"><span className="stat-icon green"><Check size={17} /></span><div><b>{orders.filter((item) => item.status === "Completed").length}</b><small>Completed today</small></div></div><div className="panel records-kpi"><span className="stat-icon purple"><Wallet size={17} /></span><div><b>{money(orders.filter((item) => item.payment !== "Paid").reduce((sum, item) => sum + item.total, 0))}</b><small>Outstanding balance</small></div></div></div>
    <section className="panel records-panel">
      <div className="records-toolbar"><div><h3>All lab orders <span className="table-count">{filtered.length}</span></h3><p>View and update diagnostic orders.</p></div><div className="table-filters"><label className="search-input table-search"><Search size={15} /><input placeholder="Search patient or invoice..." value={search} onChange={(event) => { setSearch(event.target.value); setPageNumber(1); }} /></label><select value={paymentFilter} onChange={(event) => { setPaymentFilter(event.target.value); setPageNumber(1); }} aria-label="Filter payment status"><option>All payments</option><option>Paid</option><option>Unpaid</option><option>Due</option></select><select value={statusFilter} onChange={(event) => { setStatusFilter(event.target.value); setPageNumber(1); }} aria-label="Filter order status"><option>All statuses</option><option>Pending</option><option>Sample Collected</option><option>Completed</option></select></div></div>
      <div className="table-scroll"><table><thead><tr><th>INVOICE NO.</th><th>DATE</th><th>PATIENT</th><th>SUBTOTAL</th><th>PAYMENT</th><th>ORDER STATUS</th><th /></tr></thead><tbody>{visible.map((order) => <tr key={order.invoice}><td><button className="invoice-link" onClick={() => showNotice(`Order ${order.invoice} · ${order.patient}`)}>{order.invoice}</button></td><td>{order.date}</td><td><div className="patient-cell"><span className="patient-avatar">{order.patient.split(" ").map((word) => word[0]).slice(0, 2).join("")}</span><span><b>{order.patient}</b><small>{order.phone}</small></span></div></td><td><b className="table-total">{money(order.total)}</b></td><td><StatusBadge value={order.payment} /></td><td><StatusBadge value={order.status} /></td><td><div className="row-actions"><button title={order.payment === "Paid" ? "Payment collected" : "Collect payment"} disabled={order.payment === "Paid"} onClick={() => { updateOrder(order.invoice, "payment"); showNotice(`Payment collected for ${order.invoice}`); }}><Wallet size={15} /></button><button title="Update invoice status" disabled={order.status === "Completed"} onClick={() => { updateOrder(order.invoice, "status"); showNotice(`Order status updated for ${order.invoice}`); }}><Activity size={15} /></button><button title="Download invoice" onClick={() => downloadInvoice(order)}><Download size={15} /></button></div></td></tr>)}</tbody></table>
      {visible.length === 0 && <div className="empty-table"><span><Search size={20} /></span><b>No lab orders found</b><p>Try changing your search or filters.</p></div>}
      </div>
      <div className="table-footer"><span>Showing <b>{filtered.length ? start + 1 : 0}–{Math.min(start + 5, filtered.length)}</b> of <b>{filtered.length}</b> orders</span><div><button aria-label="Previous page" disabled={pageNumber === 1} onClick={() => setPageNumber((value) => Math.max(1, value - 1))}><ChevronLeft size={16} /></button><button className="page-current">{pageNumber}</button><button aria-label="Next page" disabled={start + 5 >= filtered.length} onClick={() => setPageNumber((value) => value + 1)}><ChevronRight size={16} /></button></div></div>
    </section>
  </>;
}

function StatusBadge({ value }: { value: PaymentStatus | LabStatus }) {
  const className = value.toLowerCase().replace(/ /g, "-");
  return <span className={`status-badge ${className}`}><i />{value}</span>;
}

function ModulePage({ page, changePage, showNotice }: { page: Page; changePage: (page: Page) => void; showNotice: (message: string) => void }) {
  const modules: Record<string, { icon: typeof Users; features: string[]; action: string }> = {
    Prescription: { icon: ClipboardList, features: ["Digital prescriptions with hospital letterhead", "Medicine dosage and duration library", "Advised tests and patient history", "Print-ready prescription records"], action: "Create prescription" },
    "App Users": { icon: Users, features: ["Role-based access for 7 staff types", "User status and login history", "Module-level permissions", "Secure account management"], action: "Invite team member" },
    "Master Data": { icon: Settings, features: ["Departments, doctors, and schedules", "Wards, rooms, and bed types", "Lab tests, rates, and reference ranges", "Medicines, taxes, and insurance"], action: "Manage settings" },
    "Patients & EMR": { icon: Users, features: ["Patient demographics and unique IDs", "Medical history, allergies, and vitals", "Visit timeline and clinical documents", "Registration and patient search"], action: "Register patient" },
    "Doctor Scheduling": { icon: CalendarDays, features: ["Weekly doctor schedule and shifts", "Availability and leave management", "Appointment rescheduling", "Online and in-person slots"], action: "Schedule appointment" },
    "IPD & Bed Management": { icon: BedDouble, features: ["Live ward and bed availability", "Admissions, transfers, and discharge", "Nurse notes and daily rounds", "Occupancy by bed type"], action: "View bed map" },
    "Billing & Invoicing": { icon: Wallet, features: ["OPD, IPD, laboratory, and pharmacy bills", "Advance, split, and refund payments", "Insurance and TPA claims", "Tax and outstanding balance tracking"], action: "Create invoice" },
    "Pharmacy & Inventory": { icon: FlaskConical, features: ["Medicine stock and batch tracking", "Expiry alerts and purchase orders", "Supplier and inventory management", "Prescription-linked dispensing"], action: "View inventory" },
    "Reports & Analytics": { icon: Activity, features: ["Daily and monthly revenue reports", "Doctor and department performance", "Laboratory test volume", "Exportable operational summaries"], action: "View dashboard" },
    "Emergency & Casualty": { icon: Activity, features: ["Rapid patient registration", "Triage levels and acuity tracking", "Emergency care team assignments", "Ambulance arrival coordination"], action: "Register patient" },
    "Radiology & Imaging": { icon: Search, features: ["Imaging orders and scheduling", "Radiology report uploads", "DICOM and PDF study records", "Patient imaging history"], action: "Create imaging order" },
    "Operation Theatre": { icon: CalendarDays, features: ["Operating-room schedule", "Surgeon and care-team assignments", "Pre- and post-operative notes", "Procedure consumables tracking"], action: "Schedule procedure" },
    "Nurse Station": { icon: Users, features: ["Medication administration chart", "Vitals and observation tracking", "Nursing task lists", "Ward-level patient handover"], action: "View ward beds" },
    "Blood Bank": { icon: Activity, features: ["Stock by blood group", "Donor profiles and donation history", "Cross-match and transfusion requests", "Low-stock monitoring"], action: "Review blood stock" },
    "Ambulance & Transport": { icon: CalendarDays, features: ["Ambulance and vehicle availability", "Dispatch and trip tracking", "Crew and driver assignments", "Patient transfer coordination"], action: "Review transport" },
    "HR & Payroll": { icon: Users, features: ["Staff attendance and shift rosters", "Leave requests and balances", "Payroll and salary records", "Employee directory"], action: "Manage staff" },
    "Accounts & Finance": { icon: Wallet, features: ["Income and expense ledgers", "Daily closing and reconciliation", "Due and refund management", "Profit and loss summaries"], action: "Review finances" },
    Notifications: { icon: Bell, features: ["Appointment reminders", "Report-ready alerts", "Payment due notifications", "SMS, WhatsApp, and email preferences"], action: "Manage notifications" },
    "Patient Portal": { icon: Users, features: ["Online appointment booking", "Download reports and prescriptions", "Pay outstanding bills", "Telemedicine visit access"], action: "Preview patient portal" },
    "Queue Display": { icon: LayoutDashboard, features: ["Live token and doctor queue", "Waiting-room display mode", "Now-serving announcements", "Department-specific queue views"], action: "Open queue display" },
    "Audit & Security": { icon: ShieldCheck, features: ["User activity and access history", "Role-based permissions", "Session and sign-in controls", "Backup and privacy settings"], action: "Review security" },
    "Branches & Languages": { icon: Settings, features: ["Multiple hospital locations", "Branch-level department settings", "English and local-language labels", "Print template configuration"], action: "Manage branches" },
  };
  const data = modules[page] ?? modules.Prescription;
  const Icon = data.icon;
  const clickAction = () => {
    if (page === "Patients & EMR" || page === "Doctor Scheduling") changePage("Take New Appointment");
    else if (page === "Reports & Analytics") changePage("Dashboard");
    else if (page === "Billing & Invoicing") changePage("Lab Order Records");
    else if (page === "Pharmacy & Inventory" || page === "Master Data") changePage("Take Lab Order");
    else if (page === "Emergency & Casualty") changePage("Take New Appointment");
    else if (page === "Radiology & Imaging") changePage("Take Lab Order");
    else showNotice(`${data.action} is ready to connect to your hospital workflow.`);
  };
  return <div className="module-page"><section className="panel module-hero"><span className="module-icon"><Icon size={23} /></span><div><span className="eyebrow">CAREFlow HOSPITAL ERP</span><h2>{page}</h2><p>{pageDescription(page)}</p></div><span className="coming-badge"><i /> Module overview</span></section><div className="module-content"><div><SectionHeading title="Built for your care team" subtitle="A connected workflow designed to keep patient care moving." /><div className="module-feature-grid">{data.features.map((feature, index) => <div className="panel module-feature" key={feature}><span className="feature-check"><Check size={15} /></span><div><small>0{index + 1}</small><b>{feature}</b></div></div>)}</div></div><aside className="panel module-next"><span className="stat-icon blue"><Icon size={18} /></span><h3>Ready when you are</h3><p>Continue to a related workflow while this module is being configured for your organization.</p><button className="button button-primary full-button" onClick={clickAction}>{data.action}<ChevronRight size={16} /></button></aside></div><section className="panel module-note"><span><ShieldCheck size={18} /></span><div><b>Connected and secure by design</b><p>Careflow keeps your care teams and patient workflows in sync. Module data is protected with role-based access controls.</p></div></section></div>;
}

export default App;
