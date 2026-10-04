import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import { Search, QrCode, Smartphone, ShoppingBag, Save, ArrowLeft, Globe, Camera, Eye, EyeOff, CheckCircle } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState('ar'); // التبديل بين العربية والفرنسية

  return (
    <Router>
      <div className={`min-h-screen bg-slate-900 text-white ${lang === 'ar' ? 'font-sans rtl' : 'font-sans ltr'}`}>
        {/* شريط علوي ثابت للغة */}
        <header className="bg-slate-800 p-4 flex justify-between items-center border-b border-slate-700">
          <h1 className="text-xl font-bold text-cyan-400">سوق برو / Shop Pro</h1>
          <button 
            onClick={() => setLang(lang === 'ar' ? 'fr' : 'ar')}
            className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 px-4 py-1.5 rounded-full text-sm font-medium transition"
          >
            <Globe size={16} />
            {lang === 'ar' ? 'Français' : 'العربية'}
          </button>
        </header>

        <Routes>
          <Route path="/" element={<MerchantLogin />} />
          <Route path="/register" element={<MerchantRegister />} />
          <Route path="/dashboard/:shopId" element={<MerchantDashboard lang={lang} />} />
          <Route path="/admin-secure" element={<AdminPanel lang={lang} />} />
          <Route path="/shop/:shopId" element={<CustomerView lang={lang} />} />
        </Routes>
      </div>
    </Router>
  );
}

// ==========================================
// 1️⃣ واجهة المدير السرية (ADMIN PANEL)
// ==========================================
function AdminPanel({ lang }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [shops, setShops] = useState([
    { id: '1', shop_name: 'متجر الأناقة', phone_number: '0555123456', max_products: 50, is_unlimited: false, total_products: 12 },
    { id: '2', shop_name: 'إلكترو وهران', phone_number: '0666987654', max_products: 50, is_unlimited: true, total_products: 45 }
  ]);

  const toggleUnlimited = (id) => {
    setShops(shops.map(shop => shop.id === id ? { ...shop, is_unlimited: !shop.is_unlimited } : shop));
  };

  const filteredShops = shops.filter(shop => 
    shop.shop_name.includes(searchQuery) || shop.phone_number.includes(searchQuery)
  );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6 text-cyan-400">
        {lang === 'ar' ? 'لوحة تحكم المدير السرية' : "Panneau d'administration"}
      </h2>
      
      <div className="relative mb-6">
        <Search className="absolute right-3 top-3.5 text-slate-400" size={20} />
        <input 
          type="text"
          placeholder={lang === 'ar' ? 'البحث السريع باسم المحل أو رقم الهاتف...' : 'Recherche par nom ou téléphone...'}
          className="w-full bg-slate-800 text-white pr-10 pl-4 py-3 rounded-lg border border-slate-700 focus:outline-none focus:border-cyan-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700">
        <table className="w-full text-right border-collapse">
          <thead>
            <tr className="bg-slate-700 text-slate-300">
              <th className="p-4">{lang === 'ar' ? 'اسم المتجر' : 'Nom du magasin'}</th>
              <th className="p-4">{lang === 'ar' ? 'رقم الهاتف للتأكيد' : 'Téléphone'}</th>
              <th className="p-4">{lang === 'ar' ? 'عدد السلع' : 'Produits'}</th>
              <th className="p-4 text-center">{lang === 'ar' ? 'تفعيل التعبئة غير المحدودة' : 'Stock illimité'}</th>
            </tr>
          </thead>
          <tbody>
            {filteredShops.map((shop) => (
              <tr key={shop.id} className="border-b border-slate-700 hover:bg-slate-750 transition">
                <td className="p-4 font-bold">{shop.shop_name}</td>
                <td className="p-4 text-cyan-300 font-mono">{shop.phone_number}</td>
                <td className="p-4">{shop.total_products} / {shop.is_unlimited ? '∞' : '50'}</td>
                <td className="p-4 text-center">
                  <button 
                    onClick={() => toggleUnlimited(shop.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition ${shop.is_unlimited ? 'bg-emerald-600 text-white' : 'bg-slate-600 text-slate-300'}`}
                  >
                    {shop.is_unlimited ? (lang === 'ar' ? 'مفعلة (غير محدود)' : 'Activé') : (lang === 'ar' ? 'باقة مجانية (50 منتج)' : 'Désactivé')}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ==========================================
// 2️⃣ فضاء التاجر (MERCHANT WORKSPACE)
// ==========================================
function MerchantRegister() {
  const navigate = useNavigate();
  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-slate-800 rounded-xl border border-slate-700">
      <h2 className="text-xl font-bold text-center mb-6 text-cyan-400">إنشاء حساب تاجر جديد</h2>
      <div className="space-y-4">
        <input type="text" placeholder="اسم المحل" className="w-full bg-slate-900 p-3 rounded-lg border border-slate-700" />
        <input type="text" placeholder="رقم الهاتف" className="w-full bg-slate-900 p-3 rounded-lg border border-slate-700" />
        <input type="password" placeholder="كلمة المرور" className="w-full bg-slate-900 p-3 rounded-lg border border-slate-700" />
        <p className="text-xs text-amber-400 font-medium">⚠️ الباقة المجانية (50 منتج) ستفعل تلقائياً فور التسجيل.</p>
        <button onClick={() => navigate('/dashboard/demo')} className="w-full bg-cyan-600 py-3 rounded-lg font-bold">تسجيل الحساب</button>
        <p className="text-center text-sm text-slate-400">لديك حساب بالفعل؟ <Link to="/" className="text-cyan-400">سجل دخولك هنا</Link></p>
      </div>
    </div>
  );
}

function MerchantLogin() {
  const navigate = useNavigate();
  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-slate-800 rounded-xl border border-slate-700">
      <h2 className="text-xl font-bold text-center mb-6 text-cyan-400">تسجيل الدخول - فضاء التاجر</h2>
      <div className="space-y-4">
        <input type="text" placeholder="رقم الهاتف" className="w-full bg-slate-900 p-3 rounded-lg border border-slate-700" />
        <input type="password" placeholder="كلمة المرور" className="w-full bg-slate-900 p-3 rounded-lg border border-slate-700" />
        <button onClick={() => navigate('/dashboard/demo')} className="w-full bg-cyan-600 py-3 rounded-lg font-bold">دخول الحساب</button>
        <p className="text-center text-sm text-slate-400">تاجر جديد؟ <Link to="/register" className="text-cyan-400">افتح متجرك مجاناً الآن</Link></p>
      </div>
    </div>
  );
}

function MerchantDashboard({ lang }) {
  const [activeTab, setActiveTab] = useState(3); 
  const [showProductsList, setShowProductsList] = useState(false); 
  const [productsCount, setProductsCount] = useState(1); 
  const [showPopup, setShowPopup] = useState(false);
  const [products, setProducts] = useState([
    { name: 'حليب الصومام 1ل', price: '120 دج', barcode: '613000112233' }
  ]);

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (productsCount >= 50) {
      setShowPopup(true); 
      return;
    }
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
      <nav className="grid grid-cols-3 gap-2 mb-6 bg-slate-800 p-2 rounded-xl border border-slate-700 text-center text-sm font-bold">
        <button onClick={() => setActiveTab(1)} className={`py-3 rounded-lg ${activeTab === 1 ? 'bg-cyan-600' : 'text-slate-400'}`}>
          1. معلومات المحل
        </button>
        <button onClick={() => setActiveTab(2)} className={`py-3 rounded-lg ${activeTab === 2 ? 'bg-cyan-600' : 'text-slate-400'}`}>
          2. كود الـ QR
        </button>
        <button onClick={() => setActiveTab(3)} className={`py-3 rounded-lg ${activeTab === 3 ? 'bg-cyan-600' : 'text-slate-400'}`}>
          3. إدارة المنتجات
        </button>
      </nav>

      {activeTab === 1 && (
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 space-y-4">
          <h3 className="text-lg font-bold border-b border-slate-700 pb-2">تحديث بيانات المتجر</h3>
          <input type="text" placeholder="اسم المحل" defaultValue="متجر الأناقة" className="w-full bg-slate-900 p-3 rounded-lg border border-slate-700" />
          <input type="text" placeholder="رابط فيسبوك" className="w-full bg-slate-900 p-3 rounded-lg border border-slate-700" />
          <input type="text" placeholder="رابط إنستغرام" className="w-full bg-slate-900 p-3 rounded-lg border border-slate-700" />
          <input type="text" placeholder="رابط تيك توك" className="w-full bg-slate-900 p-3 rounded-lg border border-slate-700" />
          <button className="bg-cyan-600 px-6 py-2.5 rounded-lg font-bold flex items-center gap-2"><Save size={18}/> حفظ التعديلات</button>
        </div>
      )}

      {activeTab === 2 && (
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 text-center space-y-4">
          <h3 className="text-lg font-bold mb-4">كود الـ QR الخاص بمتجرك للزبائن</h3>
          <div className="bg-white p-4 inline-block rounded-xl border-4 border-cyan-500">
            <QrCode size={180} className="text-slate-900" />
          </div>
          <p className="text-sm text-slate-400">بإمكان الزبائن مسح هذا الكود لمعاينة السلع مباشرة</p>
حفظ الكود كصورة

)}
{activeTab === 3 && (



إضافة منتج جديد

الباقة المجانية: {productsCount} / 50 منتج

 تصوير المنتج (HD)


 حفظ السلعة



<button
onClick={() => setShowProductsList(!showProductsList)}
className="w-full bg-slate-700 hover:bg-slate-600 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition"
>
{showProductsList ?  : }
{showProductsList ? 'إخفاء قائمة المنتجات من أسفل' : 'إظهار المنتجات المحفوظة المُرتبة أبجدياً'}
{showProductsList && (

{products.map((p, idx) => (


{p.name}
Barcode: {p.barcode}

{p.price}

))}

)}


)}
{showPopup && (


تنبيه انتهاء السعة المجانية!
لقد وصلت للحد الأقصى لباقة التجربة المحددة بـ 50 منتجاً، يرجى التواصل مع الإدارة لفتح التخزين والمخزون غير المحدود.


تواصل عبر واتساب الإدارة

<button onClick={() => setShowPopup(false)} className="w-full bg-slate-700 py-2 rounded-lg text-xs font-medium">
إغلاق النافذة




)}

);
}
// ==========================================
// 3️⃣ واجهة الزبون الاحترافية (CUSTOMER VIEW)
// ==========================================
function CustomerView({ lang }) {
const [scanResult, setScanResult] = useState(null);
const handleSimulateScan = () => {
setScanResult({
name: 'حليب الصومام 1ل كامل الدسم',
price: '120 دج',
img: 'unsplash.com'
});
};
return (



PRO

مرحباً بك في متجر الأناقة
امسح باركود أي سلعة في المحل لمعرفة سعرها فوراً
f





🎵

مسح المنتج (فتح الكاميرا والاضاءة)
{scanResult && (


 تم التعرف على السلعة بنجاح




{scanResult.name}
{scanResult.price}


<button
onClick={() => setScanResult(null)}
className="w-full bg-slate-700 text-sm font-bold py-2 rounded-lg hover:bg-slate-600 transition"
>
مسح منتج جديد


)}

);
}
