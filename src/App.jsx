import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Search, QrCode, Smartphone, Save, Globe, Camera, Eye, EyeOff, CheckCircle, Shield, Users, Layers, Zap, Info, SmartphoneNfc } from 'lucide-react';

// ==========================================
// ⚙️ إعدادات الحماية الخاصة بالمدير
// ==========================================
const ADMIN_PHONE = "0770193164"; 
const ADMIN_PASSWORD = "@\u20ac\u0025\u0041\u004d\u006e\u0045\u0035\u0035\u004c\u0061\u0052\u0067\u0030\u0038\u0039\u0049"; 

export default function App() {
  const [lang, setLang] = useState('ar'); 
  const isAr = lang === 'ar';

  return (
    <Router>
      <div className={`min-h-screen bg-slate-950 text-slate-100 ${isAr ? 'font-sans rtl' : 'font-sans ltr'}`}>
        <header className="bg-slate-900/80 backdrop-blur-md p-4 flex justify-between items-center border-b border-slate-800 sticky top-0 z-50">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-cyan-500 animate-pulse"></div>
            <h1 className="text-xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">{isAr ? '\u0633\u0648\u0642\u0020\u0628\u0631\u0648' : 'Shop Pro'}</h1>
          </div>
          <button onClick={() => setLang(isAr ? 'fr' : 'ar')} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-full text-xs font-bold border border-slate-700 transition-all active:scale-95">
            <Globe size={14} className="text-cyan-400" /> {isAr ? 'Français' : '\u0627\u0644\u0639\u0631\u0628\u064a\u0629'}
          </button>
        </header>
        <Routes>
          <Route path="/" element={<MerchantLogin isAr={isAr} />} />
          <Route path="/register" element={<MerchantRegister isAr={isAr} />} />
          <Route path="/dashboard/:shopId" element={<MerchantDashboard isAr={isAr} />} />
          <Route path="/admin-secure" element={<AdminPanel isAr={isAr} />} />
          <Route path="/shop/:shopId" element={<CustomerView isAr={isAr} />} />
        </Routes>
      </div>
    </Router>
  );
}

function AdminPanel({ isAr }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [shops, setShops] = useState([
    { id: '1', shop_name: '\u0645\u062a\u062c\u0631\u0020\u0627\u0644\u0623\u0646\u0627\u0642\u0629', phone_number: '0555999999', is_unlimited: false, total_products: 12 },
    { id: '2', shop_name: '\u0625\u0644\u0643\u062a\u0631\u0648\u0020\u0648\u0647\u0631\u0627\u0646', phone_number: '0666987654', is_unlimited: true, total_products: 45 }
  ]);

  const toggleUnlimited = (id) => {
    setShops(shops.map(shop => shop.id === id ? { ...shop, is_unlimited: !shop.is_unlimited } : shop));
  };

  const filteredShops = shops.filter(shop => shop.shop_name.includes(searchQuery) || shop.phone_number.includes(searchQuery));

  return (
    <div className="p-4 max-w-5xl mx-auto space-y-6">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-3xl border border-slate-800 relative overflow-hidden shadow-2xl">
        <div className="flex items-center gap-3 mb-2">
          <Shield className="text-cyan-400" size={24} />
          <h2 className="text-2xl font-black text-white">{isAr ? '\u0644\u0648\u062d\u062e\u0020\u0627\u0644\u0645\u062f\u064a\u0631\u0020\u0627\u0644\u0633\u0631\u064a\u0629' : 'Admin Panel'}</h2>
        </div>
        <p className="text-slate-400 text-xs">{isAr ? '\u0645\u0631\u062d\u0628\u0627\u0020\u0628\u0643\u0020\u064a\u0627\u0020\u0645\u062f\u064a\u0631\u0020\u0627\u0644\u062a\u0637\u0628\u064a\u0642' : 'Welcome Admin'}</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div><p className="text-slate-400 text-[10px] uppercase font-bold">{isAr ? '\u0627\u0644\u0645\u062a\u062aj\u0631' : 'Shops'}</p><p className="text-2xl font-black text-cyan-400">{shops.length}</p></div>
          <Users className="text-slate-700" size={24} />
        </div>
        <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div><p className="text-slate-400 text-[10px] uppercase font-bold">{isAr ? '\u0627\u0644\u0644\u0627\u0020\u0645\u062d\u062f\u0648\u062f' : 'Unlimited'}</p><p className="text-2xl font-black text-emerald-400">{shops.filter(s=>s.is_unlimited).length}</p></div>
          <Zap className="text-slate-700" size={24} />
        </div>
      </div>
      <div className="relative">
        <Search className="absolute right-4 top-3.5 text-slate-500" size={18} />
        <input type="text" placeholder={isAr ? '\u0627\u0644\u0628\u062d\u062b\u0020\u0627\u0644\u0633\u0631\u064a\u0639\u0020\u002e\u002e\u002e' : 'Search...'} className="w-full bg-slate-900 text-white pr-10 pl-4 py-3 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500 text-sm" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      </div>
      <div className="space-y-3">
        {filteredShops.map((shop) => (
          <div key={shop.id} className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex justify-between items-center hover:border-slate-700 transition-all">
            <div className="space-y-1">
              <h4 className="font-bold text-white text-sm">{shop.shop_name}</h4>
              <p className="text-xs font-mono text-cyan-400">{shop.phone_number}</p>
              <div className="text-[10px] px-2 py-0.5 rounded bg-slate-800 inline-block text-slate-400 font-bold">{isAr ? '\u0627\u0644\u0633\u0644\u0631\u003a' : 'Products:'} {shop.total_products}</div>
            </div>
            <button onClick={() => toggleUnlimited(shop.id)} className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all active:scale-95 ${shop.is_unlimited ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-900/30' : 'bg-slate-800 text-slate-400 border border-slate-700'}`}>
              {shop.is_unlimited ? (isAr ? '\u063a\u064a\u0631\u0020\u0645\u062d\u062f\u0648\u062f' : 'Unlimited') : (isAr ? '\u062a\u0631\u0642\u064a\u062e' : 'Upgrade')}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function MerchantRegister({ isAr }) {
  const navigate = useNavigate();
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-black text-white">{isAr ? '\u0625\u0646\u0634\u0627\u0621\u0020\u0645\u062a\u062c\u0631\u0020\u062c\u062f\u064a\u062f' : 'Register'}</h2>
      </div>
      <div className="space-y-4">
        <input type="text" placeholder={isAr ? '\u0627\u0633\u0645\u0020\u0061\u006c\u006d\u0061\u0068\u0061\u006c' : 'Store Name'} className="w-full bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-sm focus:outline-none" />
        <input type="text" placeholder={isAr ? '\u0631\u0642\u0020\u0061\u006c\u0068\u0061\u0074\u0066' : 'Phone'} className="w-full bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-sm focus:outline-none" />
        <input type="password" placeholder={isAr ? '\u0643\u0644\u0645\u0629\u0020\u0061\u006c\u0073\u0069\u0072' : 'Password'} className="w-full bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-sm focus:outline-none" />
        <button onClick={() => navigate('/dashboard/demo')} className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 py-3.5 rounded-xl font-black shadow-lg text-sm">{isAr ? '\u062a\u0633\u062c\u064a\u0644' : 'Create'}</button>
      </div>
    </div>
  );
}

function MerchantLogin({ isAr }) {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-black bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">{isAr ? '\u062a\u0633\u062c\u064a\u0644\u0020\u0061\u006c\u0064\u006f\u006b\u0068\u006f\u006c' : 'Login'}</h2>
      </div>
      <div className="space-y-4">
        <input type="text" placeholder={isAr ? '\u0631\u0642\u0020\u0061\u006c\u0068\u0061\u0074\u0066' : 'Phone'} className="w-full bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-sm focus:outline-none" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <input type="password" placeholder={isAr ? '\u0643\u0644\u0645\u0629\u0020\u0061\u006c\u0073\u0069\u0072' : 'Password'} className="w-full bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-sm focus:outline-none" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={() => { if (phone === ADMIN_PHONE && password === ADMIN_PASSWORD) { navigate('/admin-secure'); } else { navigate('/dashboard/demo'); } }} className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 py-3.5 rounded-xl font-black shadow-lg text-sm">{isAr ? '\u062f\u062e\u0648\u0644' : 'Login'}</button>
      </div>
    </div>
  );
}
function MerchantDashboard({ isAr }) {
  const [activeTab, setActiveTab] = useState(3); 
  const [showProductsList, setShowProductsList] = useState(false); 
  const [productsCount, setProductsCount] = useState(1); 
  const [showPopup, setShowPopup] = useState(false);
  const [products, setProducts] = useState([{ name: '\u062d\u0644\u064a\u0628\u0020\u0627\u0644\u0635\u0648\u0645\u0627\u0645', price: '120 DA', barcode: '613000112233' }]);

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (productsCount >= 50) { setShowPopup(true); return; }
    const name = e.target.pname.value;
    const price = e.target.pprice.value;
    const barcode = e.target.pbarcode.value;
    if(name && price && barcode) {
      setProducts([...products, { name, price, barcode }].sort((a,b) => a.name.localeCompare(b.name)));
      setProductsCount(productsCount + 1);
      e.target.reset();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <nav className="grid grid-cols-3 gap-1 bg-slate-900 p-1.5 rounded-2xl border border-slate-800 text-center text-xs font-black">
        <button onClick={() => setActiveTab(1)} className={`py-3 rounded-xl transition-all ${activeTab === 1 ? 'bg-cyan-600 text-white' : 'text-slate-400'}`}>{isAr ? '\u0627\u0644\u0628\u064a\u0627\u0645\u0627\u062a' : 'Settings'}</button>
        <button onClick={() => setActiveTab(2)} className={`py-3 rounded-xl transition-all ${activeTab === 2 ? 'bg-cyan-600 text-white' : 'text-slate-400'}`}>{isAr ? '\u0051\u0052' : 'QR'}</button>
        <button onClick={() => setActiveTab(3)} className={`py-3 rounded-xl transition-all ${activeTab === 3 ? 'bg-cyan-600 text-white' : 'text-slate-400'}`}>{isAr ? '\u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a' : 'Products'}</button>
      </nav>

      {activeTab === 1 && (
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
          <input type="text" placeholder="Store Name" defaultValue="Store Demo" className="w-full bg-slate-950 p-3 rounded-xl border border-slate-800 text-sm focus:outline-none" />
          <button className="bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2.5 rounded-xl font-bold text-xs">{isAr ? '\u062d\u0641\u0638' : 'Save'}</button>
        </div>
      )}

      {activeTab === 2 && (
        <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 text-center space-y-4 shadow-xl">
          <div className="bg-white p-4 inline-block rounded-3xl border-4 border-cyan-500/20"><QrCode size={160} className="text-slate-950" /></div>
          <p className="text-xs text-slate-400">{isAr ? '\u0627\u0645\u0633\u062d\u0020\u0627\u0644\u0643\u0648\u062f' : 'Scan QR Code'}</p>
        </div>
      )}

      {activeTab === 3 && (
        <div className="space-y-4">
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-black text-white">{isAr ? '\u0625\u0636\u0627\u0641\u062e\u0020\u0645\u0646\u062a\u062c' : 'Add Product'}</h3>
              <span className="bg-slate-950 px-3 py-1 rounded-full text-[10px] font-black text-amber-400 border border-slate-800">{isAr ? '\u0627\u0644\u0628\u0627\u0642\u0629\u003a' : 'Free Limit:'} {productsCount} / 50</span>
            </div>
            <form onSubmit={handleSaveProduct} className="space-y-3">
              <input type="text" name="pname" placeholder={isAr ? '\u0627\u0633\u0645\u0020\u0061\u006c\u006d\u006e\u0074\u006a' : 'Name'} required className="w-full bg-slate-950 p-3 rounded-xl text-xs focus:outline-none" />
              <input type="text" name="pprice" placeholder={isAr ? '\u0627\u0644\u0633\u0639\u0631' : 'Price'} required className="w-full bg-slate-950 p-3 rounded-xl text-xs focus:outline-none" />
              <div className="flex gap-2">
                <input type="text" name="pbarcode" placeholder={isAr ? '\u0627\u0644\u0628\u0627\u0631\u0643\u0648\u062f' : 'Barcode'} required className="w-full bg-slate-950 p-3 rounded-xl text-xs focus:outline-none" />
                <button type="button" className="bg-slate-800 px-4 rounded-xl text-cyan-400"><Camera size={16} /></button>
              </div>
              <button type="submit" className="w-full bg-cyan-600 py-3 rounded-xl font-black text-xs">{isAr ? '\u062d\u0641\u0638\u0020\u0627\u0644\u0633\u0644\u0639\u0629' : 'Save Product'}</button>
            </form>
          </div>

          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <button onClick={() => setShowProductsList(!showProductsList)} className="w-full bg-slate-800 hover:bg-slate-750 py-3 rounded-xl font-black text-xs border border-slate-700">
              {showProductsList ? (isAr ? '\u0625\u062e\u0641\u0627\u0621' : 'Hide') : (isAr ? '\u0625\u0638\u0647\u0627\u0631\u0020\u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a' : 'Show Products')}
            </button>
            {showProductsList && (
              <div className="mt-3 space-y-2 border-t border-slate-800 pt-3">
                {products.map((p, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-slate-950 p-3 rounded-xl text-xs">
                    <div><p className="font-bold text-white">{p.name}</p><p className="text-[10px] text-slate-500 font-mono">BC: {p.barcode}</p></div>
                    <span className="text-cyan-400 font-black">{p.price}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {showPopup && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-slate-900 p-6 rounded-3xl border-2 border-amber-500 max-w-sm w-full text-center space-y-4">
            <h4 className="text-xl font-bold text-amber-400">{isAr ? '\u062a\u0646\u0628\u064a\u0647' : 'Limit'}</h4>
            <p className="text-slate-400 text-xs">{isAr ? '\u0644\u0642\u062f\u0020\u0648\u0635\u0644\u062a\u0020\u0644\u0644\u062d\u062f\u0020\u0627\u0644\u0623\u0642\u0635\u0649\u0020\u0035\u0030' : 'Limit 50 reached.'}</p>
            <a href={`https://wa.me{ADMIN_PHONE.substring(1)}`} className="block w-full bg-gradient-to-r from-emerald-600 to-teal-600 py-3 rounded-xl font-black text-xs text-white">{isAr ? '\u0627\u0644\u0625\u062f\u0627\u0631\u062f\u0020\u0648\u0627\u062a\u0633\u0627\u0628' : 'WhatsApp'}</a>
          </div>
        </div>
      )}
    </div>
  );
}

function CustomerView() {
  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  const startScanSimulation = () => {
    setIsScanning(true);
    setScanResult(null);
    setTimeout(() => {
      setIsScanning(false);
      setScanResult({ name: '\u062d\u0644\u064a\u0628\u0020\u0627\u0644\u0635\u0648\u0645\u0627\u0645\u0020\u0031\u0020\u0644\u064a\u062a\u0631', price: '120 DA' });
    }, 2500); 
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-8 text-center">
      <div className="space-y-3 mt-4">
        <div className="w-24 h-24 bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 rounded-3xl mx-auto flex items-center justify-center font-black text-2xl text-white shadow-xl rotate-3">PRO</div>
        <h2 className="text-2xl font-black text-white">\u0645\u0631\u062d\u0628\u062a\u0627\u0020\u0628\u0643\u0020\u0641\u064a\u0020\u0627\u0644\u0645\u062a\u062c\u0631</h2>
        <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">\u0627\u0645\u0633\u062d\u0020\u0627\u0644\u0628\u0627\u0631\u0643\u0648\u062f\u0020\u0644\u0645\u0631\u0631\u0641\u062e\u0020\u0627\u0644\u0633\u0639\u0631</p>
      </div>

      {!isScanning ? (
        <button onClick={startScanSimulation} className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 py-4.5 rounded-2xl font-black text-sm flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-all text-white">
          <Camera size={20} /> \u0641\u062a\u062d\u0020\u0643\u0627\u0645\u064a\u0631\u0627\u0020\u0627\u0644\u0645\u0633\u062d
        </button>
      ) : (
        <div className="bg-slate-900 p-8 rounded-3xl border-2 border-cyan-500/40 relative overflow-hidden h-56 flex flex-col items-center justify-center space-y-4">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-red-500 shadow-[0_0_12px_#ef4444] animate-bounce z-10"></div>
          <SmartphoneNfc size={44} className="text-cyan-400 animate-pulse" />
          <div className="space-y-1 z-20">
            <p className="text-xs font-black text-cyan-400 animate-pulse">\u062c\u0627\u0631\u064a\u0020\u0627\u0644\u0645\u0633\u062d\u0020\u0648\u062a\u0634\u063a\u064a\u0644\u0020\u0627\u0644\u0641\u0644\u0627\u0634</p>
          </div>
        </div>
      )}

      {scanResult && (
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 text-right space-y-4 shadow-2xl">
          <div className="flex items-center gap-2 text-emerald-400 font-black text-xs">
            <CheckCircle size={16} /> \u062a\u0645\u0020\u0627\u0644\u062a\u0639\u0631\u0641\u0020\u0628\u0646\u062c\u0627\u062d
          </div>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
            <div className="space-y-1">
              <h4 className="font-bold text-sm text-white">{scanResult.name}</h4>
            </div>
            <span className="text-xl font-black text-cyan-400">{scanResult.price}</span>
          </div>
          <button onClick={startScanSimulation} className="w-full bg-slate-800 text-xs font-bold py-2.5 rounded-xl border border-slate-700 font-black">\u0645\u0633\u062d\u0020\u062c\u062f\u064a\u062f</button>
        </div>
      )}
    </div>
  );
}
function MerchantDashboard({ isAr }) {
  const [activeTab, setActiveTab] = useState(3); 
  const [showProductsList, setShowProductsList] = useState(false); 
  const [productsCount, setProductsCount] = useState(1); 
  const [showPopup, setShowPopup] = useState(false);
  const [products, setProducts] = useState([{ name: '\u062d\u0644\u064a\u0628\u0020\u0627\u0644\u0635\u0648\u0645\u0627\u0645', price: '120 DA', barcode: '613000112233' }]);

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (productsCount >= 50) { setShowPopup(true); return; }
    const name = e.target.pname.value;
    const price = e.target.pprice.value;
    const barcode = e.target.pbarcode.value;
    if(name && price && barcode) {
      setProducts([...products, { name, price, barcode }].sort((a,b) => a.name.localeCompare(b.name)));
      setProductsCount(productsCount + 1);
      e.target.reset();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <nav className="grid grid-cols-3 gap-1 bg-slate-900 p-1.5 rounded-2xl border border-slate-800 text-center text-xs font-black">
        <button onClick={() => setActiveTab(1)} className={`py-3 rounded-xl transition-all ${activeTab === 1 ? 'bg-cyan-600 text-white' : 'text-slate-400'}`}>{isAr ? '\u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a' : 'Settings'}</button>
        <button onClick={() => setActiveTab(2)} className={`py-3 rounded-xl transition-all ${activeTab === 2 ? 'bg-cyan-600 text-white' : 'text-slate-400'}`}>{isAr ? '\u0051\u0052' : 'QR'}</button>
        <button onClick={() => setActiveTab(3)} className={`py-3 rounded-xl transition-all ${activeTab === 3 ? 'bg-cyan-600 text-white' : 'text-slate-400'}`}>{isAr ? '\u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a' : 'Products'}</button>
      </nav>

      {activeTab === 1 && (
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
          <input type="text" placeholder="Store Name" defaultValue="Store Demo" className="w-full bg-slate-950 p-3 rounded-xl border border-slate-800 text-sm focus:outline-none" />
          <button className="bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2.5 rounded-xl font-bold text-xs">{isAr ? '\u062d\u0641\u0638' : 'Save'}</button>
        </div>
      )}

      {activeTab === 2 && (
        <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 text-center space-y-4 shadow-xl">
          <div className="bg-white p-4 inline-block rounded-3xl border-4 border-cyan-500/20"><QrCode size={160} className="text-slate-950" /></div>
          <p className="text-xs text-slate-400">{isAr ? '\u0627\u0645\u0633\u062d\u0020\u0627\u0644\u0643\u0648\u062f' : 'Scan QR Code'}</p>
        </div>
      )}

      {activeTab === 3 && (
        <div className="space-y-4">
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-black text-white">{isAr ? '\u0625\u0636\u0627\u0641\u062e\u0020\u0645\u0646\u062a\u062c' : 'Add Product'}</h3>
              <span className="bg-slate-950 px-3 py-1 rounded-full text-[10px] font-black text-amber-400 border border-slate-800">{isAr ? '\u0627\u0644\u0628\u0627\u0642\u0629\u003a' : 'Free Limit:'} {productsCount} / 50</span>
            </div>
            <form onSubmit={handleSaveProduct} className="space-y-3">
              <input type="text" name="pname" placeholder={isAr ? '\u0627\u0633\u0645\u0020\u0061\u006c\u006d\u006e\u0074\u006a' : 'Name'} required className="w-full bg-slate-950 p-3 rounded-xl text-xs focus:outline-none" />
              <input type="text" name="pprice" placeholder={isAr ? '\u0627\u0644\u0633\u0639\u0631' : 'Price'} required className="w-full bg-slate-950 p-3 rounded-xl text-xs focus:outline-none" />
              <div className="flex gap-2">
                <input type="text" name="pbarcode" placeholder={isAr ? '\u0627\u0644\u0628\u0621\u0627\u0631\u0643\u0648\u062f' : 'Barcode'} required className="w-full bg-slate-950 p-3 rounded-xl text-xs focus:outline-none" />
                <button type="button" className="bg-slate-800 px-4 rounded-xl text-cyan-400"><Camera size={16} /></button>
              </div>
              <button type="submit" className="w-full bg-cyan-600 py-3 rounded-xl font-black text-xs shadow-lg shadow-cyan-900/20 active:scale-98 transition-all">{isAr ? '\u062d\u0641\u0638\u0020\u0627\u0644\u0633\u0644\u0639\u0629' : 'Save Product'}</button>
            </form>
          </div>
          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 shadow-md">
            <button onClick={() => setShowProductsList(!showProductsList)} className="w-full bg-slate-800 hover:bg-slate-750 py-3 rounded-xl font-black text-xs border border-slate-700 transition-all">
              {showProductsList ? (isAr ? '\u0625\u062e\u0641\u0627\u0621' : 'Hide') : (isAr ? '\u0625\u0638\u0647\u0627\u0631\u0020\u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a' : 'Show Products') }
            </button>
            {showProductsList && (
              <div className="mt-3 space-y-2 border-t border-slate-800 pt-3">
                {products.map((p, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-slate-950 p-3 rounded-xl text-xs border border-slate-800">
                    <div><p className="font-bold text-white">{p.name}</p><p className="text-[10px] text-slate-500 font-mono">BC: {p.barcode}</p></div>
                    <span className="text-cyan-400 font-black">{p.price}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {showPopup && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-slate-900 p-6 rounded-3xl border-2 border-amber-500 max-w-sm w-full text-center space-y-4 shadow-2xl">
            <h4 className="text-xl font-bold text-amber-400">{isAr ? '\u062a\u0646\u0628\u064a\u0647' : 'Limit'}</h4>
            <p className="text-slate-400 text-xs">{isAr ? '\u0644\u0642\u062f\u0020\u0648\u0635\u0644\u062a\u0020\u0644\u0644\u062d\u062f\u0020\u0627\u0644\u0623\u0642\u0635\u0649\u0020\u0035\u0030' : 'Limit 50 reached.'}</p>
            <a href={`https://wa.me{ADMIN_PHONE.substring(1)}`} className="block w-full bg-gradient-to-r from-emerald-600 to-teal-600 py-3 rounded-xl font-black text-xs text-white shadow-md shadow-emerald-950/40">{isAr ? '\u0627\u0644\u0625\u062f\u0627\u0631\u062f' : 'WhatsApp'}</a>
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
    setIsScanning(true);
    setScanResult(null);
    setTimeout(() => {
      setIsScanning(false);
      setScanResult({ name: '\u062d\u0644\u064a\u0628\u0020\u0627\u0644\u0635\u0648\u0645\u0627\u0645\u0020\u0031\u0020\u0644\u064a\u062a\u0631\u0020\u0643\u0627\u0645\u0644', price: '120 DA' });
    }, 2500); 
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-8 text-center">
      <div className="space-y-3 mt-4">
        <div className="w-24 h-24 bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 rounded-3xl mx-auto flex items-center justify-center font-black text-2xl text-white shadow-xl shadow-cyan-950/40 rotate-3 border border-cyan-400/20">PRO</div>
        <h2 className="text-2xl font-black text-white">{isAr ? '\u0645\u0631\u062d\u062b\u0627\u0020\u0628\u0643\u0020\u0641\u064a\u0020\u0627\u0644\u0645\u062a\u062c\u0631' : 'Welcome to Store'}</h2>
        <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">{isAr ? '\u0627\u0645\u0633\u062d\u0020\u0627\u0644\u0628\u0627\u0631\u0643\u0648\u062f\u0020\u0644\u0645\u0631\u0631\u0641\u062e\u0020\u0627\u0633\u0639\u0631' : 'Scan barcode to see the price instantly'}</p>
      </div>

      {!isScanning ? (
        <button onClick={startScanSimulation} className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 py-4.5 rounded-2xl font-black text-sm flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-all text-white shadow-cyan-950/40">
          <Camera size={20} /> {isAr ? '\u0641\u062a\u062d\u0020\u0643\u0627\u0645\u064a\u0631\u0627\u0020\u0627\u0644\u0645\u0633\u062d' : 'Open Scan Camera'}
        </button>
      ) : (
        <div className="bg-slate-900 p-8 rounded-3xl border-2 border-cyan-500/40 relative overflow-hidden h-56 flex flex-col items-center justify-center space-y-4 shadow-2xl">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-red-500 shadow-[0_0_12px_#ef4444] animate-bounce z-10"></div>
          <SmartphoneNfc size={44} className="text-cyan-400 animate-pulse" />
          <div className="space-y-1 z-20">
            <p className="text-xs font-black text-cyan-400 animate-pulse">{isAr ? '\u062c\u0627\u0631\u064a\u0020\u0627\u0644\u0645\u0633\u062d\u0020\u0648\u062a\u0634\u063a\u064a\u0644\u0020\u0627\u0644\u0641\u0644\u0627\u0634' : 'Scanning & Laser Flash On'}</p>
          </div>
        </div>
      )}

      {scanResult && (
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 text-right space-y-4 shadow-2xl animate-scaleIn">
          <div className="flex items-center gap-2 text-emerald-400 font-black text-xs">
            <CheckCircle size={16} /> {isAr ? '\u062a\u0645\u0020\u0627\u0644\u062a\u0639\u0631\u0641\u0020\u0628\u0646\u062c\u0627\u062d' : 'Success'}
          </div>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center shadow-inner">
            <div className="space-y-1">
              <h4 className="font-bold text-sm text-white">{scanResult.name}</h4>
              <p className="text-[10px] text-slate-500 font-mono">SKU: 613000112233</p>
            </div>
            <span className="text-xl font-black text-cyan-400">{scanResult.price}</span>
          </div>
          <button onClick={startScanSimulation} className="w-full bg-slate-800 text-xs font-bold py-2.5 rounded-xl border border-slate-700 font-black hover:bg-slate-750 transition-all">{isAr ? '\u0645\u0633\u062d\u0020\u0645\u0646\u062a\u062c\u0020\u062c\u062f\u064a\u062f' : 'Scan New Product'}</button>
        </div>
      )}
    </div>
  );
}
