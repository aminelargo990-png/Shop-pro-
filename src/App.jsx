import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  Store,
  Package,
  Plus,
  Trash2,
  Edit,
  LogOut,
  Globe,
  Camera,
  Search,
  QrCode,
  Save,
  ArrowLeft,
  Loader2,
  AlertCircle,
  CheckCircle,
  ExternalLink,
} from "lucide-react";

import { supabase } from "./lib/supabase.js";

const LIMIT = 50;

const translations = {
  ar: {
    app: "ShopPro DZ",
    login: "تسجيل الدخول",
    register: "إنشاء متجر",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    store: "اسم المتجر",
    phone: "رقم الهاتف",
    enter: "دخول",
    create: "إنشاء الحساب",
    dashboard: "لوحة المتجر",
    products: "المنتجات",
    add: "إضافة منتج",
    name: "اسم المنتج",
    price: "السعر بالدينار",
    barcode: "الباركود",
    photo: "صورة المنتج",
    save: "حفظ",
    cancel: "إلغاء",
    edit: "تعديل",
    delete: "حذف",
    logout: "تسجيل الخروج",
    search: "ابحث عن منتج...",
    count: "عدد المنتجات",
    free: "الباقة المجانية",
    unlimited: "منتج",
    loading: "جارٍ التحميل...",
    noProducts: "لا توجد منتجات حتى الآن",
    success: "تم الحفظ بنجاح",
    error: "حدث خطأ",
    qr: "رابط متجرك",
    copy: "افتح صفحة المتجر",
    back: "رجوع",
    upload: "اختر صورة",
    loginFirst: "يرجى تسجيل الدخول أولًا",
    trialEnded: "وصلت إلى الحد المجاني. تواصل مع المدير لتفعيل حسابك.",
    authError: "تعذر تسجيل الدخول أو إنشاء الحساب.",
    confirmDelete: "هل تريد حذف هذا المنتج؟",
    invalidPrice: "أدخل سعرًا صحيحًا أكبر من أو يساوي صفرًا.",
    noAccount: "ليس لديك حساب؟",
    haveAccount: "لديك حساب بالفعل؟",
    language: "Français",
    storeUnavailable: "المتجر غير متاح أو لا يمكن عرض بياناته حاليًا.",
    scanHint: "يمكن للزبائن فتح هذا الرابط لمشاهدة المتجر.",
    profileError: "تعذر تحميل بيانات المتجر.",
    cameraUnavailable: "إضافة مسح الباركود بالكاميرا ستتم في الخطوة التالية.",
  },
  fr: {
    app: "ShopPro DZ",
    login: "Connexion",
    register: "Créer une boutique",
    email: "Adresse e-mail",
    password: "Mot de passe",
    store: "Nom de la boutique",
    phone: "Téléphone",
    enter: "Se connecter",
    create: "Créer le compte",
    dashboard: "Tableau de bord",
    products: "Produits",
    add: "Ajouter un produit",
    name: "Nom du produit",
    price: "Prix en DZD",
    barcode: "Code-barres",
    photo: "Photo du produit",
    save: "Enregistrer",
    cancel: "Annuler",
    edit: "Modifier",
    delete: "Supprimer",
    logout: "Déconnexion",
    search: "Rechercher un produit...",
    count: "Nombre de produits",
    free: "Offre gratuite",
    unlimited: "produits",
    loading: "Chargement...",
    noProducts: "Aucun produit pour le moment",
    success: "Enregistré avec succès",
    error: "Une erreur est survenue",
    qr: "Lien de votre boutique",
    copy: "Ouvrir la boutique",
    back: "Retour",
    upload: "Choisir une photo",
    loginFirst: "Veuillez vous connecter.",
    trialEnded: "Limite gratuite atteinte. Contactez le gestionnaire.",
    authError: "Connexion ou création de compte impossible.",
    confirmDelete: "Voulez-vous supprimer ce produit ?",
    invalidPrice: "Saisissez un prix valide supérieur ou égal à zéro.",
    noAccount: "Pas encore de compte ?",
    haveAccount: "Vous avez déjà un compte ?",
    language: "العربية",
    storeUnavailable: "Boutique indisponible ou données inaccessibles.",
    scanHint: "Les clients peuvent ouvrir ce lien pour voir la boutique.",
    profileError: "Impossible de charger la boutique.",
    cameraUnavailable: "Le scanner caméra sera ajouté à l'étape suivante.",
  },
};

function Message({ children, error = false }) {
  if (!children) return null;

  return (
    <div
      className={`rounded-xl border p-3 text-sm ${
        error
          ? "border-red-500/30 bg-red-500/10 text-red-300"
          : "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
      }`}
      role="status"
    >
      {children}
    </div>
  );
}

function Field({ label, ...props }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm text-slate-300">{label}</span>
      <input
        {...props}
        className={`w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400 ${props.className || ""}`}
      />
    </label>
  );
}

export default function App() {
  const [lang, setLang] = useState(
    () => localStorage.getItem("shoppro-language") || "fr"
  );

  const t = translations[lang] || translations.fr;
  const isAr = lang === "ar";

  function toggleLanguage() {
    const next = isAr ? "fr" : "ar";
    localStorage.setItem("shoppro-language", next);
    setLang(next);
  }

  return (
    <BrowserRouter>
      <div
        dir={isAr ? "rtl" : "ltr"}
        className="min-h-screen bg-slate-950 font-sans text-slate-100"
      >
        <header className="sticky top-0 z-40 flex items-center justify-between border-b border-slate-800 bg-slate-950/95 px-4 py-4 backdrop-blur">
          <Link to="/" className="flex items-center gap-2 font-black text-cyan-400">
            <Store size={22} />
            {t.app}
          </Link>

          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm"
          >
            <Globe size={16} />
            {t.language}
          </button>
        </header>

        <main className="mx-auto w-full max-w-2xl px-4 py-6">
          <Routes>
            <Route path="/" element={<AuthPage t={t} />} />
            <Route path="/dashboard" element={<Dashboard t={t} />} />
            <Route path="/shop/:shopId" element={<PublicShop t={t} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <footer className="px-4 py-6 text-center text-xs text-slate-600">
          ShopPro DZ · {new Date().getFullYear()}
        </footer>
      </div>
    </BrowserRouter>
  );
}

function AuthPage({ t }) {
  const navigate = useNavigate();

  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [storeName, setStoreName] = useState("");
  const [phone, setPhone] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  useEffect(() => {
    let alive = true;

    supabase.auth.getSession().then(({ data, error: sessionError }) => {
      if (!alive) return;

      if (!sessionError && data.session) {
        navigate("/dashboard", { replace: true });
      }
    });

    return () => {
      alive = false;
    };
  }, [navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    setInfo("");

    try {
      if (mode === "register") {
        if (!storeName.trim() || !phone.trim()) {
          throw new Error(
            t.error + ": " + t.store + " / " + t.phone
          );
        }

        const { data, error: signUpError } =
          await supabase.auth.signUp({
            email: email.trim(),
            password,
          });

        if (signUpError) throw signUpError;

        if (!data.user) {
          throw new Error(t.authError);
        }

        if (!data.session) {
          setInfo(
            "تم إنشاء الطلب. تحقق من بريدك الإلكتروني لتأكيد الحساب، ثم سجّل الدخول."
          );
          setBusy(false);
          return;
        }

        const { error: profileError } = await supabase
          .from("merchants")
          .upsert(
            {
              id: data.user.id,
              store_name: storeName.trim(),
              phone: phone.trim(),
            },
            { onConflict: "id" }
          );

        if (profileError) throw profileError;

        navigate("/dashboard", { replace: true });
      } else {
        const { error: loginError } =
          await supabase.auth.signInWithPassword({
            email: email.trim(),
            password,
          });

        if (loginError) throw loginError;

        navigate("/dashboard", { replace: true });
      }
    } catch (err) {
      setError(err?.message || t.authError);
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="mx-auto mt-6 max-w-md space-y-6">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-600">
          <Store size={30} />
        </div>

        <h1 className="text-2xl font-black">{t.app}</h1>

        <p className="mt-2 text-sm text-slate-400">
          {mode === "login" ? t.login : t.register}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-3xl border border-slate-800 bg-slate-900 p-5"
      >
        {mode === "register" && (
          <>
            <Field
              label={t.store}
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              required
              autoComplete="organization"
            />

            <Field
              label={t.phone}
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              autoComplete="tel"
            />
          </>
        )}

        <Field
          label={t.email}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />

        <Field
          label={t.password}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          autoComplete={mode === "login" ? "current-password" : "new-password"}
        />

        <Message error>{error}</Message>
        <Message>{info}</Message>

        <button
          type="submit"
          disabled={busy}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-600 px-4 py-3 font-bold text-white transition hover:bg-cyan-500 disabled:opacity-50"
        >
          {busy ? <Loader2 className="animate-spin" size={18} /> : null}
          {busy
            ? t.loading
            : mode === "login"
              ? t.enter
              : t.create}
        </button>

        <button
          type="button"
          onClick={() => {
            setMode(mode === "login" ? "register" : "login");
            setError("");
            setInfo("");
          }}
          className="w-full py-2 text-sm text-cyan-400"
        >
          {mode === "login" ? t.noAccount : t.haveAccount}{" "}
          {mode === "login" ? t.register : t.login}
        </button>
      </form>
    </section>
  );
}

function Dashboard({ t }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [merchant, setMerchant] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    barcode: "",
  });

  useEffect(() => {
    let alive = true;

    async function loadDashboard() {
      setLoading(true);
      setError("");

      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

      if (!alive) return;

      if (sessionError || !sessionData.session) {
        navigate("/", { replace: true });
        return;
      }

      const currentUser = sessionData.session.user;
      setUser(currentUser);

      const { data: profile, error: profileError } = await supabase
        .from("merchants")
        .select("*")
        .eq("id", currentUser.id)
        .maybeSingle();

      if (!alive) return;

      if (profileError) {
        setError(profileError.message);
        setLoading(false);
        return;
      }

      if (!profile) {
        setError(
          "لم يتم العثور على ملف المتجر. سجّل الخروج ثم أنشئ الحساب مجددًا، أو راجع سياسات merchants."
        );
        setLoading(false);
        return;
      }

      setMerchant(profile);

      const { data: productData, error: productError } = await supabase
        .from("products")
        .select("*")
        .eq("merchant_id", currentUser.id)
        .order("name", { ascending: true });

      if (!alive) return;

      if (productError) {
        setError(productError.message);
      } else {
        setProducts(productData || []);
      }

      setLoading(false);
    }

    loadDashboard();

    return () => {
      alive = false;
    };
  }, [navigate]);

  function resetForm() {
    setForm({ name: "", price: "", barcode: "" });
    setPhotoFile(null);
    setEditingId(null);
    setShowForm(false);
  }

  async function signOut() {
    const { error: signOutError } = await supabase.auth.signOut();

    if (signOutError) {
      setError(signOutError.message);
      return;
    }

    navigate("/", { replace: true });
  }

  async function saveProduct(e) {
    e.preventDefault();
    if (!user || !merchant) return;

    setSaving(true);
    setError("");
    setMessage("");

    try {
      const price = Number(form.price);

      if (
        !form.name.trim() ||
        form.price === "" ||
        !Number.isFinite(price) ||
        price < 0
      ) {
        throw new Error(t.invalidPrice);
      }

      if (
        !editingId &&
        !merchant.unlimited_products &&
        products.length >= (merchant.trial_product_limit || LIMIT)
      ) {
        throw new Error(t.trialEnded);
      }

      let photoPath = null;

      if (photoFile) {
        const safeName = photoFile.name.replace(/[^a-zA-Z0-9._-]/g, "_");
        const path = `${user.id}/${crypto.randomUUID()}-${safeName}`;

        const { error: uploadError } = await supabase.storage
          .from("product-images")
          .upload(path, photoFile, {
            upsert: false,
            contentType: photoFile.type || undefined,
          });

        if (uploadError) throw uploadError;
        photoPath = path;
      }

      const payload = {
        merchant_id: user.id,
        name: form.name.trim(),
        price,
        barcode: form.barcode.trim() || null,
        updated_at: new Date().toISOString(),
      };

      if (editingId) {
        if (photoPath) payload.photo_path = photoPath;

        const { data, error: updateError } = await supabase
          .from("products")
          .update(payload)
          .eq("id", editingId)
          .eq("merchant_id", user.id)
          .select()
          .single();

        if (updateError) throw updateError;

        setProducts((old) =>
          old
            .map((item) => (item.id === editingId ? data : item))
            .sort((a, b) => a.name.localeCompare(b.name))
        );
      } else {
        if (photoPath) payload.photo_path = photoPath;

        const { data, error: insertError } = await supabase
          .from("products")
          .insert(payload)
          .select()
          .single();

        if (insertError) {
          if (photoPath) {
            await supabase.storage
              .from("product-images")
              .remove([photoPath]);
          }
          throw insertError;
        }

        setProducts((old) =>
          [...old, data].sort((a, b) => a.name.localeCompare(b.name))
        );
      }

      setMessage(t.success);
      resetForm();
    } catch (err) {
      setError(err?.message || t.error);
    } finally {
      setSaving(false);
    }
  }

  function beginEdit(product) {
    setEditingId(product.id);
    setForm({
      name: product.name || "",
      price: String(product.price ?? ""),
      barcode: product.barcode || "",
    });
    setPhotoFile(null);
    setShowForm(true);
    setError("");
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function deleteProduct(product) {
    if (!window.confirm(t.confirmDelete)) return;
    if (!user) return;

    setError("");
    setMessage("");

    const { error: deleteError } = await supabase
      .from("products")
      .delete()
      .eq("id", product.id)
      .eq("merchant_id", user.id);

    if (deleteError) {
      setError(deleteError.message);
      return;
    }

    setProducts((old) => old.filter((item) => item.id !== product.id));

    if (product.photo_path) {
      const { error: imageError } = await supabase.storage
        .from("product-images")
        .remove([product.photo_path]);

      if (imageError) {
        setError(
          "تم حذف المنتج، لكن تعذر حذف الصورة من Storage. قد نحتاج إلى مراجعة سياسة DELETE."
        );
        return;
      }
    }

    setMessage(t.success);
  }

  async function getPhotoUrl(path) {
    if (!path) return null;

    const { data } = await supabase.storage
      .from("product-images")
      .createSignedUrl(path, 3600);

    return data?.signedUrl || null;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 py-20 text-slate-400">
        <Loader2 className="animate-spin" />
        {t.loading}
      </div>
    );
  }

  if (!user || !merchant) {
    return (
      <div className="space-y-4">
        <Message error>{error || t.profileError}</Message>
        <Link to="/" className="inline-block text-cyan-400">
          {t.back}
        </Link>
      </div>
    );
  }

  const shopUrl = `${window.location.origin}/shop/${user.id}`;
  const limit = merchant.unlimited_products
    ? "∞"
    : merchant.trial_product_limit || LIMIT;

  const filteredProducts = products.filter((product) =>
    `${product.name} ${product.barcode || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <section className="space-y-5">
      <div className="flex items-start justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-900 p-4">
        <div className="min-w-0">
          <h1 className="break-words text-xl font-black">
            {merchant.store_name}
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            {merchant.phone}
          </p>
        </div>

        <button
          onClick={signOut}
          className="flex shrink-0 items-center gap-2 rounded-xl border border-slate-700 px-3 py-2 text-sm"
        >
          <LogOut size={16} />
          {t.logout}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <Package className="mb-2 text-cyan-400" />
          <p className="text-xs text-slate-400">{t.count}</p>
          <p className="mt-1 text-2xl font-black">
            {products.length} / {limit}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <QrCode className="mb-2 text-emerald-400" />
          <p className="text-xs text-slate-400">{t.qr}</p>
          <a
            href={shopUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-2 flex items-center gap-1 break-all text-xs text-cyan-400"
          >
            {t.copy}
            <ExternalLink size={14} />
          </a>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
        <div className="mb-3 flex items-center gap-2">
          <QrCode className="text-cyan-400" size={20} />
          <h2 className="font-bold">{t.qr}</h2>
        </div>

        <p className="mb-3 break-all text-xs text-slate-400">{shopUrl}</p>

        <img
          src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(shopUrl)}`}
          alt="QR code"
          className="mx-auto rounded-xl bg-white p-2"
          width="220"
          height="220"
        />

        <p className="mt-3 text-center text-xs text-slate-400">
          {t.scanHint}
        </p>
      </div>

      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-black">{t.products}</h2>

        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
            setError("");
            setMessage("");
          }}
          className="flex items-center gap-2 rounded-xl bg-cyan-600 px-4 py-3 text-sm font-bold"
        >
          <Plus size={17} />
          {t.add}
        </button>
      </div>

      <Message error>{error}</Message>
      <Message>{message}</Message>

      {showForm && (
        <form
          onSubmit={saveProduct}
          className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900 p-4"
        >
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-bold">
              {editingId ? t.edit : t.add}
            </h3>

            <button
              type="button"
              onClick={resetForm}
              className="text-sm text-slate-400"
            >
              {t.cancel}
            </button>
          </div>

          <Field
            label={t.name}
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            required
          />

          <Field
            label={t.price}
            type="number"
            min="0"
            step="0.01"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: e.target.value })
            }
            required
          />

          <Field
            label={t.barcode}
            value={form.barcode}
            onChange={(e) =>
              setForm({ ...form, barcode: e.target.value })
            }
          />

          <label className="block space-y-2">
            <span className="text-sm text-slate-300">{t.photo}</span>

            <span className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-slate-600 bg-slate-950 p-4 text-sm">
              <Camera size={18} />
              {photoFile ? photoFile.name : t.upload}
            </span>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) =>
                setPhotoFile(e.target.files?.[0] || null)
              }
            />
          </label>

          {photoFile && (
            <img
              src={URL.createObjectURL(photoFile)}
              alt="Preview"
              className="h-40 w-full rounded-xl object-contain"
            />
          )}

          <button
            type="submit"
            disabled={saving}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 font-bold disabled:opacity-50"
          >
            {saving ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Save size={18} />
            )}
            {t.save}
          </button>
        </form>
      )}

      <label className="relative block">
        <Search
          className="absolute top-3.5 text-slate-500"
          size={18}
          style={{ [document.documentElement.dir === "rtl" ? "right" : "left"]: "12px" }}
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t.search}
          className="w-full rounded-xl border border-slate-800 bg-slate-900 py-3 text-sm outline-none focus:border-cyan-400"
          style={{
            paddingRight: document.documentElement.dir === "rtl" ? "40px" : "12px",
            paddingLeft: document.documentElement.dir === "rtl" ? "12px" : "40px",
          }}
        />
      </label>

      {filteredProducts.length === 0 ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center text-sm text-slate-400">
          {t.noProducts}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredProducts.map((product) => (
            <ProductRow
              key={product.id}
              product={product}
              t={t}
              getPhotoUrl={getPhotoUrl}
              onEdit={() => beginEdit(product)}
              onDelete={() => deleteProduct(product)}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function ProductRow({ product, t, getPhotoUrl, onEdit, onDelete }) {
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    let alive = true;

    if (product.photo_path) {
      getPhotoUrl(product.photo_path).then((url) => {
        if (alive) setPhotoUrl(url || "");
      });
    }

    return () => {
      alive = false;
    };
  }, [product.photo_path]);

  return (
    <article className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900 p-3">
      {photoUrl ? (
        <img
          src={photoUrl}
          alt={product.name}
          className="h-16 w-16 shrink-0 rounded-xl bg-slate-950 object-cover"
        />
      ) : (
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-slate-600">
          <Package size={24} />
        </div>
      )}

      <div className="min-w-0 flex-1">
        <h3 className="break-words font-bold">{product.name}</h3>

        <p className="mt-1 text-sm font-black text-cyan-400">
          {Number(product.price).toLocaleString()} DZD
        </p>

        {product.barcode && (
          <p className="mt-1 break-all text-xs text-slate-500">
            {product.barcode}
          </p>
        )}
      </div>

      <div className="flex shrink-0 flex-col gap-2">
        <button
          onClick={onEdit}
          aria-label={t.edit}
          className="rounded-lg bg-slate-800 p-2 text-cyan-400"
        >
          <Edit size={16} />
        </button>

        <button
          onClick={onDelete}
          aria-label={t.delete}
          className="rounded-lg bg-red-950 p-2 text-red-400"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </article>
  );
}

function PublicShop({ t }) {
  const { shopId } = useParams();

  const [merchant, setMerchant] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    let alive = true;

    async function loadPublicShop() {
      setLoading(true);
      setUnavailable(false);

      const { data: profile, error: profileError } = await supabase
        .from("merchants")
        .select("id, store_name, store_logo_url, instagram_url, facebook_url, tiktok_url")
        .eq("id", shopId)
        .maybeSingle();

      if (!alive) return;

      if (profileError || !profile) {
        setUnavailable(true);
        setLoading(false);
        return;
      }

      setMerchant(profile);

      const { data: productData, error: productError } = await supabase
        .from("products")
        .select("id, name, price, barcode, photo_path")
        .eq("merchant_id", shopId)
        .order("name", { ascending: true });

      if (!alive) return;

      if (productError) {
        setUnavailable(true);
      } else {
        setProducts(productData || []);
      }

      setLoading(false);
    }

    loadPublicShop();

    return () => {
      alive = false;
    };
  }, [shopId]);

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-400">
        <Loader2 className="mx-auto mb-3 animate-spin" />
        {t.loading}
      </div>
    );
  }

  if (unavailable || !merchant) {
    return (
      <div className="space-y-4 py-10 text-center">
        <AlertCircle className="mx-auto text-amber-400" size={40} />
        <h1 className="text-xl font-bold">{t.storeUnavailable}</h1>
        <Link to="/" className="inline-block text-cyan-400">
          {t.back}
        </Link>
      </div>
    );
  }

  return (
    <section className="space-y-5">
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 text-center">
        {merchant.store_logo_url ? (
          <img
            src={merchant.store_logo_url}
            alt={merchant.store_name}
            className="mx-auto mb-4 h-24 w-24 rounded-2xl object-cover"
          />
        ) : (
          <Store className="mx-auto mb-4 text-cyan-400" size={42} />
        )}

        <h1 className="text-2xl font-black">{merchant.store_name}</h1>
      </div>

      {products.length === 0 ? (
        <p className="rounded-2xl bg-slate-900 p-6 text-center text-slate-400">
          {t.noProducts}
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {products.map((product) => (
            <PublicProduct key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}

function PublicProduct({ product }) {
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    let alive = true;

    async function loadImage() {
      if (!product.photo_path) return;

      const { data } = await supabase.storage
        .from("product-images")
        .createSignedUrl(product.photo_path, 3600);

      if (alive) setPhotoUrl(data?.signedUrl || "");
    }

    loadImage();

    return () => {
      alive = false;
    };
  }, [product.photo_path]);

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
      {photoUrl ? (
        <img
          src={photoUrl}
          alt={product.name}
          className="h-44 w-full object-cover"
        />
      ) : (
        <div className="flex h-32 items-center justify-center bg-slate-950 text-slate-600">
          <Package size={32} />
        </div>
      )}

      <div className="p-4">
        <h2 className="font-bold">{product.name}</h2>

        <p className="mt-2 text-lg font-black text-cyan-400">
          {Number(product.price).toLocaleString()} DZD
        </p>
      </div>
    </article>
  );
    }
