import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Search, QrCode, Smartphone, Save, Globe, Camera, Eye, EyeOff, CheckCircle, Shield, Users, Zap, SmartphoneNfc, ShoppingBag, Plus, BarChart3, Home, Settings, Trash2, ArrowRight } from 'lucide-react';

const ADMIN_PHONE = "0770193164"; 
const ADMIN_PASSWORD = "@\u20ac\u0025\u0041\u004d\u006e\u0045\u0035\u0035\u004c\u0061\u0052\u0067\u0030\u0038\u0039\u0049"; 

export default function App() {
  const [lang, setLang] = useState('ar'); 
  const isAr = lang === 'ar';

  return (
    <Router>
      <div className={`min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-0 sm:p-4 ${isAr ? 'font-sans rtl' : 'font-sans ltr'}`}>
        <div className="w-full max-w-md bg-slate-900 min-h-screen sm:min-h-[850px] sm:rounded-[40px] shadow-2xl border-0 sm:border-[8px] border-slate-800 relative flex flex-col overflow-hidden">
          
          <header className="bg-slate-900/90 backdrop-blur-md px-4 py-3 flex justify-between items-center border-b border-slate-800/60 sticky top-0 z-50">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_8px_#06b6d4]"></div>
              <h1 className="text-base font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400 bg-clip-text text-transparent">ShopPro DZ</h1>
            </div>
            <button onClick={() => setLang(isAr ? 'fr' : 'ar')} className="flex items-center gap-1.5 bg-slate-800/80 hover:bg-slate-700 px-3 py-1 rounded-full text-[10px] font-bold border border-slate-700/50 transition-all">
              <Globe size={12} className="text-cyan-400" /> {isAr ? 'Français' : 'العربية'}
            </button>
          </header>

          <div className="flex-1 flex flex-col pb-20 overflow-y-auto">
            <Routes>
              <Route path="/" element={<MerchantLogin isAr={isAr} />} />
              <Route path="/register" element={<MerchantRegister isAr={isAr} />} />
              <Route path="/dashboard/:shopId" element={<MerchantDashboard isAr={isAr} />} />
              <Route path="/admin-secure" element={<AdminPanel isAr={isAr} />} />
              <Route path="/shop/:shopId" element={<CustomerView isAr={isAr} />} />
            </Routes>
          </div>

        </div>
      </div>
    </Router>
  );
}
function MerchantRegister({ isAr }) {
  const navigate = useNavigate();
  return (
    <div className="p-4 space-y-6 my-auto animate-fadeIn">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 mx-auto flex items-center justify-center shadow-lg shadow-cyan-900/30">
          <ShoppingBag size={22} className="text-white" />
        </div>
        <h2 className="text-xl font-black text-white">{isAr ? 'إلا إنشاء متجرك الإلكتروني' : 'Create Store'}</h2>
        <p className="text-xs text-slate-400">{isAr ? 'إدارة متجرك بكل سهولة وبدون تعقيد' : 'Manage your store easily'}</p>
      </div>
      <div className="bg-slate-900/50 p-5 rounded-3xl border border-slate-800/80 shadow-xl space-y-4">
        <input type="text" placeholder={isAr ? 'اسم المحل أو العلامة التجارية' : 'Store Name'} className="w-full bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs text-white focus:border-cyan-500 focus:outline-none transition-all" />
        <input type="text" placeholder={isAr ? 'رقم الهاتف لتأكيد الحساب' : 'Phone'} className="w-full bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs text-white focus:border-cyan-500 focus:outline-none transition-all" />
        <input type="password" placeholder={isAr ? 'كلمة المرور السرية' : 'Password'} className="w-full bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs text-white focus:border-cyan-500 focus:outline-none transition-all" />
        <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20 text-[10px] text-amber-400 font-medium leading-relaxed">
          {isAr ? 'الباقة المجانية حد أقصى 50 منتج ستفعل تلقائياً.' : 'Free tier (50 products limit) activates automatically.'}
        </div>
        <button onClick={() => navigate('/dashboard/demo')} className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 py-3.5 rounded-xl font-black shadow-lg shadow-cyan-900/20 active:scale-95 transition-all text-xs text-white">
          {isAr ? 'إنشاء متجرك بكل سهولة' : 'Register Free'}
        </button>
        <p className="text-center text-xs text-slate-500">{isAr ? 'لديك حساب بالفعل؟' : 'Have account?'} <Link to="/" className="text-cyan-400 font-bold hover:underline">{isAr ? 'دخول' : 'Login'}</Link></p>
      </div>
    </div>
  );
}
function MerchantLogin({ isAr }) {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  
  return (
    <div className="p-4 space-y-6 my-auto animate-fadeIn">
      <div className="text-center space-y-2">
        <div className="w-14 h-14 bg-gradient-to-b from-slate-800 to-slate-900 rounded-3xl mx-auto flex items-center justify-center border border-slate-800 shadow-xl">
          <Shield className="text-cyan-400" size={24} />
        </div>
        <h2 className="text-2xl font-black text-white">{isAr ? 'تسجيل الدخول' : 'Merchant Login'}</h2>
        <p className="text-xs text-slate-400">{isAr ? 'إدارة متجرك بكل سهولة' : 'Manage your retail operations'}</p>
      </div>
      <div className="bg-slate-900/50 p-5 rounded-3xl border border-slate-800/80 shadow-xl space-y-4">
        <input type="text" placeholder={isAr ? 'رقم الهاتف أو الإيميل' : 'Phone Number'} className="w-full bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs text-white focus:border-cyan-500 focus:outline-none transition-all" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <input type="password" placeholder={isAr ? 'كلمة المرور' : 'Password'} className="w-full bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs text-white focus:border-cyan-500 focus:outline-none transition-all" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={() => { if (phone === ADMIN_PHONE && password === ADMIN_PASSWORD) { navigate('/admin-secure'); } else { navigate('/dashboard/demo'); } }} className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 py-3.5 rounded-xl font-black shadow-lg shadow-cyan-900/30 active:scale-95 transition-all text-sm text-white">
          {isAr ? 'تسجيل الدخول' : 'Secure Login'}
        </button>
        <p className="text-center text-xs text-slate-500">{isAr ? 'ليس لديك حساب؟' : 'New to ShopPro?'} <Link to="/register" className="text-cyan-400 font-bold hover:underline">{isAr ? 'إنشاء متجر جديد' : 'Create Store'}</Link></p>
      </div>
    </div>
  );
}
function AdminPanel({ isAr }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [shops, setShops] = useState([
    { id: '1', shop_name: '\u0645\u062a\u062c\u0631\u0020\u0627\u0644\u0623\u0646\u0627\u0642\u0629', phone_number: '0555999999', is_unlimited: false, total_products: 12 },
    { id: '2', shop_name: '\u0625\u0644\u0643\u062a\u0631\u0648\u0020\u0648\u0647\u0631\u0627\u0646', phone_number: '0666987654', is_unlimited: true, total_products: 45 }
  ]);
  const toggleUnlimited = (id) => { setShops(shops.map(shop => shop.id === id ? { ...shop, is_unlimited: !shop.is_unlimited } : shop)); };
  const filteredShops = shops.filter(shop => shop.shop_name.includes(searchQuery) || shop.phone_number.includes(searchQuery));

  return (
    <div className="p-4 space-y-4 animate-fadeIn">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-5 rounded-2xl border border-slate-800 shadow-xl">
        <div className="flex items-center gap-2 mb-1">
          <Shield className="text-cyan-400" size={18} />
          <h2 className="text-lg font-black text-white">{isAr ? 'لوحة تحكم المدير السرية' : 'Admin Panel'}</h2>
        </div>
        <p className="text-slate-400 text-[10px]">{isAr ? 'إدارة المتاجر وتفعيل الصلاحيات اللامحدودة' : 'Global controls'}</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between shadow-md">
          <div><p className="text-slate-500 text-[9px] font-bold uppercase">{isAr ? 'إجمالي المتاجر' : 'Stores'}</p><p className="text-xl font-black text-cyan-400">{shops.length}</p></div>
          <Users className="text-slate-700" size={20} />
        </div>
        <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between shadow-md">
          <div><p className="text-slate-500 text-[9px] font-bold uppercase">{isAr ? 'الحسابات اللامحدودة' : 'Unlimited'}</p><p className="text-xl font-black text-emerald-400">{shops.filter(s=>s.is_unlimited).length}</p></div>
          <Zap className="text-slate-700" size={20} />
        </div>
      </div>
      <div className="relative">
        <Search className="absolute right-3 top-3 text-slate-500" size={16} />
        <input type="text" placeholder={isAr ? 'بحث سريع باسم المحل أو رقم الهاتف...' : 'Search...'} className="w-full bg-slate-900 text-white pr-9 pl-3 py-2.5 rounded-xl border border-slate-800 text-xs focus:outline-none focus:border-cyan-500 transition-all" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      </div>
      <div className="space-y-2">
        {filteredShops.map((shop) => (
          <div key={shop.id} className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 flex justify-between items-center shadow-sm">
            <div className="space-y-1">
              <h4 className="font-bold text-white text-xs">{shop.shop_name}</h4>
              <p className="text-[10px] font-mono text-cyan-400">{shop.phone_number}</p>
              <div className="text-[9px] px-2 py-0.5 rounded bg-slate-800 inline-block text-slate-400 font-bold">{isAr ? 'السلع المرفوعة:' : 'Products:'} {shop.total_products}</div>
            </div>
            <button onClick={() => toggleUnlimited(shop.id)} className={`px-3 py-2 rounded-lg text-[10px] font-black transition-all ${shop.is_unlimited ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-800 text-slate-400 border border-slate-700'}`}>
              {shop.is_unlimited ? (isAr ? 'لامحدود' : 'Unlimited') : (isAr ? 'ترقية لباقة ∞' : 'Upgrade')}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
function MerchantDashboard({ isAr }) {
  const [activeTab, setActiveTab] = useState(3); 
  const [showProductsList, setShowProductsList] = useState(false); 
  const [productsCount, setProductsCount] = useState(12); 
  const [showPopup, setShowPopup] = useState(false);
  const [products, setProducts] = useState([
    { name: '\u062d\u0644\u064a\u0628\u0020\u0627\u0644\u0635\u0648\u0645\u0627\u0645\u0020\u0031\u004c', price: '120 \u062f\u062c', barcode: '613000112233' },
    { name: '\u0643\u0648\u0643\u0627\u0020\u0643\u0648\u0644\u0627\u0020\u0031\u004c', price: '150 \u062f\u062c', barcode: '5449000000996' }
  ]);

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (productsCount >= 50) { setShowPopup(true); return; }
    const name = e.target.pname.value;
    const price = e.target.pprice.value;
    const barcode = e.target.pbarcode.value;
    if(name && price && barcode) {
      setProducts([...products, { name, price: price + ' \u062f\u062c', barcode }].sort((a,b) => a.name.localeCompare(b.name)));
      setProductsCount(productsCount + 1);
      e.target.reset();
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between">
      <div className="p-4 space-y-4 flex-1 overflow-y-auto">
        <div className="bg-gradient-to-br from-slate-900 to-slate-850 p-4 rounded-2xl border border-slate-800 flex items-center justify-between shadow-lg">
          <div className="space-y-0.5">
            <h3 className="text-sm font-black text-white">{isAr ? '\u0645\u062a\u062c\u0631\u0020\u0628\u0644\u0627\u0644' : 'Store Belal'}</h3>
            <span className="text-[9px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded-full inline-block">{isAr ? '\u0645\u0641\u062a\u0648\u062d\u0020\u0627\u0644\u0622\u0646' : 'Open'}</span>
          </div>
          <span className="text-[10px] font-mono text-cyan-400 bg-slate-950 px-2.5 py-1 rounded-xl border border-slate-800">ID: demo</span>
        </div>

        {activeTab === 3 && (
          <>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-center space-y-1">
                <BarChart3 size={16} className="text-cyan-400 mx-auto" />
                <p className="text-[9px] text-slate-400">{isAr ? '\u0627\u0644\u0645\u062b\u064a\u0639\u0627\u062a' : 'Sales'}</p>
                <p className="text-xs font-black text-white">482,350 \u062f\u062c</p>
              </div>
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-center space-y-1">
                <Layers size={16} className="text-amber-400 mx-auto" />
                <p className="text-[9px] text-slate-400">{isAr ? '\u0627\u0644\u0645\u062e\u0632\u0648\u0646' : 'Stock'}</p>
                <p className="text-xs font-black text-amber-400">{productsCount} / 50</p>
              </div>
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-center space-y-1">
                <CheckCircle size={16} className="text-emerald-400 mx-auto" />
                <p className="text-[9px] text-slate-400">{isAr ? '\u0627\u0644\u0637\u0644\u0628\u0627\u062a' : 'Orders'}</p>
                <p className="text-xs font-black text-white">124</p>
              </div>
            </div>

            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
              <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                <h4 className="text-xs font-black text-white">{isAr ? '\u0625\u0636\u0627\u0641\u0629\u0020\u0645\u0646\u062a\u062c\u0020\u062c\u062f\u064a\u062f' : 'Add Product'}</h4>
                <span className="text-[9px] bg-slate-950 px-2 py-0.5 rounded-full border border-slate-800 text-amber-400 font-bold">{productsCount}/50</span>
              </div>
              <form onSubmit={handleSaveProduct} className="space-y-3">
                <input type="text" name="pname" placeholder={isAr ? '\u0627\u0633\u0645\u0020\u0627\u0644\u0645\u0646\u062a\u062c' : 'Product Name'} required className="w-full bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-white focus:outline-none" />
                <input type="text" name="pprice" placeholder={isAr ? '\u0627\u0644\u0633\u0639\u0631' : 'Price'} required className="w-full bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-white focus:outline-none" />
                <div className="flex gap-2">
                  <input type="text" name="pbarcode" placeholder={isAr ? '\u0645\u0633\u062d\u0020\u0627\u0644\u0628\u0627\u0631\u0643\u0648\u062f' : 'Barcode'} required className="w-full bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-white focus:outline-none" />
                  <button type="button" className="bg-slate-800 px-3.5 rounded-xl text-cyan-400"><Camera size={14} /></button>
                </div>
                <button type="submit" className="w-full bg-cyan-600 py-3 rounded-xl font-black text-xs text-white">{isAr ? '\u062d\u0641\u0638\u0020\u0627\u0644\u0634\u0644\u0639\u0629' : 'Save Product'}</button>
              </form>
            </div>
            <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800">
              <button onClick={() => setShowProductsList(!showProductsList)} className="w-full bg-slate-800/60 hover:bg-slate-750 py-2.5 rounded-xl font-black text-xs text-slate-300 border border-slate-700/40">
                {showProductsList ? (isAr ? '\u0625\u062e\u0641\u0627\u0621' : 'Hide') : (isAr ? '\u0625\u0638\u0647\u0627\u0631\u0020\u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a' : 'Show Products')}
              </button>
              {showProductsList && (
                <div className="mt-3 space-y-2 border-t border-slate-800 pt-3 max-h-40 overflow-y-auto">
                  {products.map((p, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-slate-950 p-3 rounded-xl text-xs border border-slate-850">
                      <div><p className="font-bold text-white text-xs">{p.name}</p><p className="text-[9px] text-slate-500 font-mono">BC: {p.barcode}</p></div>
                      <span className="text-cyan-400 font-black">{p.price}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === 2 && (
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 text-center space-y-4 shadow-xl animate-fadeIn">
            <h4 className="text-xs font-black text-slate-300">{isAr ? 'كود الـ QR الخاص بمتجرك للزبائن' : 'Store QR Code'}</h4>
            <div className="bg-white p-3 inline-block rounded-3xl border-4 border-cyan-500/20"><QrCode size={140} className="text-slate-950" /></div>
            <p className="text-[10px] text-slate-400 px-4 leading-relaxed">{isAr ? 'بإمكان الزبائن مسح الكود لمعاينة السلع مباشرة' : 'Scan to view store inventory'}</p>
          </div>
        )}

        {activeTab === 1 && (
          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-4 shadow-xl animate-fadeIn">
            <h4 className="text-xs font-black text-white">{isAr ? 'تعديل بيانات المتجر' : 'Store Settings'}</h4>
            <input type="text" placeholder="Store Name" defaultValue="متجر بلال" className="w-full bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-white focus:outline-none" />
            <button className="bg-cyan-600 px-5 py-2 rounded-xl font-bold text-xs text-white"><Save size={12}/> {isAr ? 'حفظ البيانات' : 'Save'}</button>
          </div>
        )}
      </div>

      <nav className="absolute bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-t border-slate-800/80 px-6 py-2 flex justify-between items-center z-50">
        <button onClick={() => setActiveTab(1)} className={`flex flex-col items-center gap-1 transition-all ${activeTab === 1 ? 'text-cyan-400 scale-105' : 'text-slate-500'}`}>
          <Settings size={16} />
          <span className="text-[8px] font-bold">{isAr ? '\u0627\u0644\u0625\u0639\u062f\u0627\u062f\u0627\u062a' : 'Settings'}</span>
        </button>
        <button onClick={() => setActiveTab(2)} className={`flex flex-col items-center gap-1 transition-all ${activeTab === 2 ? 'text-cyan-400 scale-105' : 'text-slate-500'}`}>
          <QrCode size={16} />
          <span className="text-[8px] font-bold">{isAr ? '\u0051\u0052\u0020\u0643\u0648\u062f' : 'QR code'}</span>
        </button>
        <button onClick={() => setActiveTab(3)} className={`flex flex-col items-center gap-1 transition-all ${activeTab === 3 ? 'text-cyan-400 scale-105' : 'text-slate-500'}`}>
          <Home size={16} />
          <span className="text-[8px] font-bold">{isAr ? '\u0627\u0644\u0631\u062a\u064a\u0633\u064a\u062e' : 'Dashboard'}</span>
        </button>
      </nav>

      {showPopup && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50 backdrop-blur-xs">
          <div className="bg-slate-900 p-5 rounded-3xl border-2 border-amber-500 max-w-xs w-full text-center space-y-4">
            <h4 className="text-base font-black text-amber-400">{isAr ? 'تنبيه السعة!' : 'Limit'}</h4>
            <a href={`https://wa.me{ADMIN_PHONE.substring(1)}`} className="block w-full bg-gradient-to-r from-emerald-600 to-teal-600 py-2 rounded-xl font-black text-xs text-white">WhatsApp</a>
          </div>
        </div>
      )}
    </div>
  );
}

function CustomerView({ isAr }) {
  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const startScanSimulation = () => {
    setIsScanning(true); setScanResult(null);
    setTimeout(() => {
      setIsScanning(false);
      setScanResult({ name: '\u0643\u0648\u0643\u0627\u0020\u0643\u0648\u0644\u0627\u0020\u0031\u004c', price: '150 \u062f\u062c' });
    }, 2500); 
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-6 text-center animate-fadeIn">
      <div className="space-y-2 mt-2">
        <div className="w-16 h-16 bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 rounded-2xl mx-auto flex items-center justify-center font-black text-lg text-white shadow-xl shadow-cyan-950/40 border border-cyan-400/20">PRO</div>
        <h2 className="text-lg font-black text-white">{isAr ? '\u0645\u0631\u062d\u0628\u0627\u0020\u0628\u0643\u0020\u0641\u064a\u0020\u0627\u0644\u0645\u062a\u062c\u0631' : 'Welcome'}</h2>
        <p className="text-[10px] text-slate-400 max-w-xs mx-auto">{isAr ? 'امسح باركود أي سلعة في المحل لمعرفة سعرها فوراً' : 'Scan barcode'}</p>
      </div>

      {!isScanning ? (
        <button onClick={startScanSimulation} className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 py-4 rounded-xl font-black text-xs flex items-center justify-center gap-2 text-white shadow-xl active:scale-95 transition-all">
          <Camera size={16} /> {isAr ? '\u0641\u062a\u062d\u0020\u0643\u0627\u0645\u064a\u0631\u0627\u0020\u0627\u0644\u0645\u0633\u062d' : 'Scan Camera'}
        </button>
      ) : (
        <div className="bg-slate-950 p-6 rounded-2xl border-2 border-cyan-500/30 relative overflow-hidden h-48 flex flex-col items-center justify-center space-y-3 shadow-2xl">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-red-500 shadow-[0_0_10px_#ef4444] animate-bounce z-10"></div>
          <SmartphoneNfc size={36} className="text-cyan-400 animate-pulse" />
          <p className="text-[10px] font-black text-cyan-400 animate-pulse">{isAr ? '\u062c\u0627\u0631\u064a\u0020\u0627\u0644\u0645\u0633\u062d\u0020\u0648\u062a\u0634\u063a\u064a\u0644\u0020\u0627\u0644\u0641\u0644\u0627\u0634' : 'Scanning...'}</p>
        </div>
      )}

      {scanResult && (
        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-right space-y-3 shadow-2xl animate-scaleIn">
          <div className="flex items-center gap-1.5 text-emerald-400 font-black text-[11px]">
            <CheckCircle size={14} /> {isAr ? '\u062a\u0645\u0020\u0627\u0644\u062a\u0639\u0631\u0641\u0020\u0628\u0646\u062c\u0627\u062d' : 'Success'}
          </div>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-850 flex justify-between items-center">
            <div className="space-y-0.5">
              <h4 className="font-bold text-xs text-white">{scanResult.name}</h4>
              <p className="text-[9px] text-slate-500 font-mono">613000112233</p>
            </div>
            <span className="text-lg font-black text-cyan-400">{scanResult.price}</span>
          </div>
          <button onClick={startScanSimulation} className="w-full bg-slate-800 text-[10px] font-black py-2 rounded-lg border border-slate-700">{isAr ? '\u0645\u0633\u062d\u0020\u0645\u0646\u062a\u062c\u0020\u062c\u062f\u064a\u062f' : 'New Scan'}</button>
        </div>
      )}
    </div>
  );
}
