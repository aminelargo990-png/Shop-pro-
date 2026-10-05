import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Search, QrCode, Smartphone, Save, Globe, Camera, Eye, EyeOff, CheckCircle } from 'lucide-react';

const ADMIN_PHONE = "0555123456"; 
const ADMIN_PASSWORD = "Admin@2026"; 

export default function App() {
  const [lang, setLang] = useState('ar'); 
  const isAr = lang === 'ar';

  return (
    <Router>
      <div className={`min-h-screen bg-slate-900 text-white ${isAr ? 'font-sans rtl' : 'font-sans ltr'}`}>
        <header className="bg-slate-800 p-4 flex justify-between items-center border-b border-slate-700">
          <h1 className="text-xl font-bold text-cyan-400">{isAr ? 'سوق برو / Shop Pro' : 'Shop Pro'}</h1>
          <button onClick={() => setLang(isAr ? 'fr' : 'ar')} className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 px-4 py-1.5 rounded-full text-sm font-medium transition">
            <Globe size={16} /> {isAr ? 'Français' : 'العربية'}
          </button>
        </header>
        <Routes>
          <Route path="/" element={<MerchantLogin isAr={isAr} />} />
          <Route path="/register" element={<MerchantRegister isAr={isAr} />} />
          <Route path="/dashboard/:shopId" element={<MerchantDashboard isAr={isAr} />} />
          <Route path="/admin-secure" element={<AdminPanel isAr={isAr} />} />
        </Routes>
      </div>
    </Router>
  );
}

function MerchantRegister({ isAr }) {
  const navigate = useNavigate();
  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-slate-800 rounded-xl border border-slate-700">
      <h2 className="text-xl font-bold text-center mb-6 text-cyan-400">{isAr ? 'إنشاء حساب تاجر جديد' : 'Inscription'}</h2>
      <div className="space-y-4">
        <input type="text" placeholder={isAr ? 'اسم المحل' : 'Nom du magasin'} className="w-full bg-slate-900 p-3 rounded-lg border border-slate-700" />
        <input type="text" placeholder={isAr ? 'رقم الهاتف' : 'Téléphone'} className="w-full bg-slate-900 p-3 rounded-lg border border-slate-700" />
        <input type="password" placeholder={isAr ? 'كلمة المرور' : 'Mot de passe'} className="w-full bg-slate-900 p-3 rounded-lg border border-slate-700" />
        <button onClick={() => navigate('/dashboard/demo')} className="w-full bg-cyan-600 py-3 rounded-lg font-bold">{isAr ? 'تسجيل الحساب' : 'Créer'}</button>
      </div>
    </div>
  );
}

function MerchantLogin({ isAr }) {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-slate-800 rounded-xl border border-slate-700">
      <h2 className="text-xl font-bold text-center mb-6 text-cyan-400">{isAr ? 'تسجيل الدخول - فضاء التاجر' : 'Connexion'}</h2>
      <div className="space-y-4">
        <input type="text" placeholder={isAr ? 'رقم الهاتف' : 'Téléphone'} className="w-full bg-slate-900 p-3 rounded-lg" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <input type="password" placeholder={isAr ? 'كلمة المرور' : 'Mot de passe'} className="w-full bg-slate-900 p-3 rounded-lg" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={() => { if (phone === ADMIN_PHONE && password === ADMIN_PASSWORD) { navigate('/admin-secure'); } else { navigate('/dashboard/demo'); } }} className="w-full bg-cyan-600 py-3 rounded-lg font-bold">{isAr ? 'دخول الحساب' : 'Se connecter'}</button>
      </div>
    </div>
  );
}
function AdminPanel({ isAr }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [shops, setShops] = useState([
    { id: '1', shop_name: 'Store 1', phone_number: '0555999999', is_unlimited: false, total_products: 12 },
    { id: '2', shop_name: 'Store 2', phone_number: '0666987654', is_unlimited: true, total_products: 45 }
  ]);
  const filteredShops = shops.filter(shop => shop.shop_name.toLowerCase().includes(searchQuery.toLowerCase()) || shop.phone_number.includes(searchQuery));
  
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6 text-cyan-400">{isAr ? 'لوحة تحكم المدير السرية' : 'Admin Panel'}</h2>
      <div className="relative mb-6">
        <input type="text" placeholder={isAr ? 'البحث السريع باسم المحل أو الهاتف...' : 'Search...'} className="w-full bg-slate-800 text-white p-3 rounded-lg border border-slate-700 focus:outline-none" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      </div>
      <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700">
        <table className="w-full text-right border-collapse">
          <thead>
            <tr className="bg-slate-700 text-slate-300">
              <th className="p-4">{isAr ? 'اسم المتجر' : 'Shop'}</th>
              <th className="p-4">{isAr ? 'رقم الهاتف' : 'Phone'}</th>
              <th className="p-4">{isAr ? 'عدد السلع' : 'Products'}</th>
              <th className="p-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredShops.map((shop) => (
              <tr key={shop.id} className="border-b border-slate-700 hover:bg-slate-750">
                <td className="p-4 font-bold">{shop.shop_name}</td>
                <td className="p-4 text-cyan-300 font-mono">{shop.phone_number}</td>
                <td className="p-4">{shop.total_products} / {shop.is_unlimited ? '∞' : '50'}</td>
                <td className="p-4 text-center">
                  <span className={`px-4 py-2 rounded-lg text-sm font-bold ${shop.is_unlimited ? 'bg-emerald-600' : 'bg-slate-600'}`}>
                    {shop.is_unlimited ? (isAr ? 'مفعلة (غير محدود)' : 'Unlimited') : (isAr ? 'باقة مجانية (50)' : 'Free')}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MerchantDashboard({ isAr }) {
  const [activeTab, setActiveTab] = useState(3); 
  const [showProductsList, setShowProductsList] = useState(false); 
  const [productsCount, setProductsCount] = useState(1); 
  const [showPopup, setShowPopup] = useState(false);
  const [products, setProducts] = useState([{ name: 'Product 1', price: '120 DZD', barcode: '613000112233' }]);

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
    <div className="max-w-4xl mx-auto p-4">
      <nav className="grid grid-cols-3 gap-2 mb-6 bg-slate-800 p-2 rounded-xl text-center text-sm font-bold">
        <button onClick={() => setActiveTab(1)} className={`py-3 rounded-lg ${activeTab === 1 ? 'bg-cyan-600' : 'text-slate-400'}`}>{isAr ? '1. معلومات المحل' : '1. Infos'}</button>
        <button onClick={() => setActiveTab(2)} className={`py-3 rounded-lg ${activeTab === 2 ? 'bg-cyan-600' : 'text-slate-400'}`}>{isAr ? '2. كود الـ QR' : '2. QR Code'}</button>
        <button onClick={() => setActiveTab(3)} className={`py-3 rounded-lg ${activeTab === 3 ? 'bg-cyan-600' : 'text-slate-400'}`}>{isAr ? '3. إدارة المنتجات' : '3. Produits'}</button>
      </nav>

      {activeTab === 1 && (
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 space-y-4">
          <input type="text" placeholder={isAr ? 'اسم المحل' : 'Name'} defaultValue="Store" className="w-full bg-slate-900 p-3 rounded-lg" />
          <button className="bg-cyan-600 px-6 py-2.5 rounded-lg font-bold">{isAr ? 'حفظ التعديلات' : 'Save'}</button>
        </div>
      )}

      {activeTab === 2 && (
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 text-center space-y-4">
          <div className="bg-white p-4 inline-block rounded-xl"><QrCode size={180} className="text-slate-900" /></div>
          <p className="text-sm text-slate-400">{isAr ? 'بإمكان الزبائن مسح هذا الكود لمعاينة السلع' : 'Scan QR Code'}</p>
        </div>
      )}

      {activeTab === 3 && (
        <div className="space-y-6">
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">{isAr ? 'إضافة منتج جديد' : 'New Product'}</h3>
              <span className="bg-slate-900 px-3 py-1 rounded-full text-xs font-bold text-amber-400">{isAr ? 'الباقة المجانية:' : 'Limit:'} {productsCount} / 50</span>
            </div>
            <form onSubmit={handleSaveProduct} className="space-y-4">
              <input type="text" name="pname" placeholder={isAr ? 'اسم المنتج' : 'Name'} required className="w-full bg-slate-900 p-3 rounded-lg" />
              <input type="text" name="pprice" placeholder={isAr ? 'السعر' : 'Price'} required className="w-full bg-slate-900 p-3 rounded-lg" />
              <input type="text" name="pbarcode" placeholder={isAr ? 'رقم الباركود' : 'Barcode'} required className="w-full bg-slate-900 p-3 rounded-lg" />
              <button type="submit" className="w-full bg-cyan-600 py-2.5 rounded-lg font-bold">{isAr ? 'حفظ السلعة' : 'Save Product'}</button>
            </form>
          </div>

          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <button onClick={() => setShowProductsList(!showProductsList)} className="w-full bg-slate-700 py-3 rounded-lg font-bold">
              {showProductsList ? (isAr ? 'إخفاء قائمة المنتجات' : 'Hide') : (isAr ? 'إظهار المنتجات المحفوظة المُرتبة أبجدياً' : 'Show Products')}
            </button>
            {showProductsList && (
              <div className="mt-4 space-y-2">
                {products.map((p, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-slate-900 p-3 rounded-lg">
                    <div><p className="font-bold text-sm">{p.name}</p><p className="text-xs text-slate-400">Barcode: {p.barcode}</p></div>
                    <span className="text-cyan-400 font-bold">{p.price}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {showPopup && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 p-6 rounded-2xl border-2 border-amber-500 max-w-sm w-full text-center space-y-4">
            <h4 className="text-xl font-bold text-amber-400">{isAr ? 'تنبيه انتهاء السعة!' : 'Limit Reached'}</h4>
            <p className="text-slate-300 text-sm">{isAr ? 'لقد وصلت للحد الأقصى (50 منتجاً)، يرجى التواصل لفتح غير المحدود.' : 'Free trial limit reached.'}</p>
            <a href={`https://wa.me{ADMIN_PHONE.substring(1)}`} className="block w-full bg-emerald-600 py-2.5 rounded-lg font-bold text-sm text-center">{isAr ? 'تواصل عبر واتساب الإدارة' : 'Contact Admin'}</a>
          </div>
        </div>
      )}
    </div>
  );
}

function CustomerView() {
  const [scanResult, setScanResult] = useState(null);
  return (
    <div className="max-w-md mx-auto p-4 space-y-6 text-center">
      <div className="space-y-2 mt-4">
        <div className="w-20 h-20 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-full mx-auto flex items-center justify-center font-bold text-xl text-white">PRO</div>
        <h2 className="text-2xl font-bold">Welcome</h2>
      </div>
      <button onClick={() => setScanResult({ name: 'Sommam Milk 1L', price: '120 DZD' })} className="w-full bg-cyan-600 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3">
        <Smartphone size={24} /> Scan Product
      </button>
      {scanResult && (
        <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700 text-right space-y-4 mt-4">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm"><CheckCircle size={18} /> Success</div>
          <h4 className="font-bold text-base text-white">{scanResult.name}</h4>
          <p className="text-xl font-black text-cyan-400">{scanResult.price}</p>
        </div>
      )}
    </div>
  );
}
