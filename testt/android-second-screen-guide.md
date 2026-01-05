# دليل تحويل الموبايل لشاشة ثانية عبر USB على Linux 🖥️📱

## 📊 الوضع الحالي

### ✅ اللي اشتغل:

- ✔️ اتصال USB tethering شغال - IP: `192.168.218.163`
- ✔️ Virtual Monitor مفعّل في GNOME
- ✔️ gnome-remote-desktop مثبّت ومفعّل
- ✔️ إعدادات VNC متضبطة في gsettings

### ❌ المشكلة:

- **GNOME 46 على Wayland** لا يدعم VNC بشكل كامل (يدعم RDP فقط)
- بورت VNC (5900) لا يفتح لأن الخدمة تعمل بـ RDP فقط
- wayvnc لا يعمل لأن GNOME لا يدعم `screencopy protocol`

---

## 🎯 الحلول المتاحة

### الحل 1: استخدام RDP بدلاً من VNC ⭐ (الأسهل)

#### الخطوات:

1. **تفعيل RDP على اللينكس:**

```bash
# تفعيل RDP
grdctl rdp enable
grdctl rdp disable-view-only
grdctl rdp set-credentials username password123

# إعادة تشغيل الخدمة
systemctl --user restart gnome-remote-desktop

# التحقق من البورت (المفترض 3389)
ss -tln | grep 3389
```

2. **على الموبايل - تثبيت تطبيق RDP:**

   - **Microsoft Remote Desktop** (مجاني - موصى به)
   - **RD Client**
   - **aRDP**

3. **الاتصال:**
   - Server: `192.168.218.163:3389`
   - Username: `username`
   - Password: `password123`

---

### الحل 2: استخدام Deskreen 🌟 (الأفضل للمرآة)

Deskreen أداة مفتوحة المصدر تحول أي جهاز لشاشة ثانية.

#### التثبيت:

```bash
# تحميل Deskreen
cd ~/Downloads
wget https://github.com/pavlobu/deskreen/releases/latest/download/Deskreen-2.0.4.AppImage
chmod +x Deskreen-2.0.4.AppImage

# تشغيل
./Deskreen-2.0.4.AppImage
```

#### الاستخدام:

1. افتح Deskreen على اللينكس
2. سيظهر QR Code
3. على الموبايل - افتح المتصفح وامسح الـ QR
4. اختر وضع "Extend" بدل "Mirror"

**مميزات:**

- ✅ يعمل عبر USB tethering
- ✅ يدعم Extend mode
- ✅ لا يحتاج تطبيق على الموبايل (يعمل من المتصفح)

---

### الحل 3: استخدام x11vnc + Xwayland 🔧 (للمتقدمين)

إذا كنت عايز تستخدم VNC بالقوة:

```bash
# تثبيت x11vnc
sudo apt install x11vnc

# تشغيل VNC server
x11vnc -display :0 -auth ~/.Xauthority -forever -loop -noxdamage -repeat -rfbauth ~/.vnc/passwd -rfbport 5900 -shared

# على الموبايل استخدم VNC Viewer
```

**ملاحظة:** قد لا يعمل بشكل مثالي على Wayland.

---

### الحل 4: استخدام scrcpy (عكس - من الموبايل لللينكس) 🔄

هذا الحل **عكس ما تريد** - يعرض شاشة الموبايل على اللينكس:

```bash
sudo apt install scrcpy
scrcpy
```

---

## 📱 أفضل تطبيقات الموبايل لكل حل

### للـ RDP:

1. **Microsoft Remote Desktop** ⭐ - الأفضل
2. **RD Client**
3. **aRDP Free Remote Desktop**

### للـ VNC:

1. **VNC Viewer** by RealVNC ⭐
2. **bVNC**
3. **MultiVNC**

### للـ Deskreen:

- لا يحتاج تطبيق - يعمل من المتصفح مباشرة! 🎉

---

## 🚀 التوصية النهائية

**احنا نوصي بالحل 1 (RDP) أو الحل 2 (Deskreen)**

### لماذا RDP؟

- ✅ مدعوم رسمياً من GNOME 46
- ✅ أداء أفضل من VNC
- ✅ تطبيقات ممتازة على Android
- ✅ مدمج في gnome-remote-desktop

### لماذا Deskreen؟

- ✅ الأسهل في الاستخدام
- ✅ لا يحتاج تطبيق على الموبايل
- ✅ يدعم Extend mode بشكل مباشر
- ✅ مفتوح المصدر

---

## 🔍 الأوامر السريعة

### تفعيل RDP:

```bash
grdctl rdp enable
grdctl rdp set-credentials myuser mypass123
grdctl rdp disable-view-only
systemctl --user restart gnome-remote-desktop
ss -tln | grep 3389
```

### تحميل Deskreen:

```bash
cd ~/Downloads
wget https://github.com/pavlobu/deskreen/releases/download/v2.0.4/Deskreen-2.0.4.AppImage
chmod +x Deskreen-2.0.4.AppImage
./Deskreen-2.0.4.AppImage
```

---

## ⚠️ ملاحظات مهمة

1. **GNOME 46 على Wayland** لا يدعم VNC بشكل كامل
2. استخدم RDP أو Deskreen بدلاً من VNC
3. تأكد من أن USB tethering شغال قبل الاتصال
4. IP الحالي: `192.168.218.163` (قد يتغير)

---

## 📞 إذا واجهت مشكلة

تحقق من:

```bash
# حالة الخدمة
systemctl --user status gnome-remote-desktop

# البورتات المفتوحة
ss -tln | grep -E '5900|3389'

# IP الحالي
ip addr show | grep 192.168

# الإعدادات
grdctl status --show-credentials
```

---

**تم إنشاء هذا الدليل في:** 29 ديسمبر 2025
**النظام:** Ubuntu 24.04 + GNOME 46 + Wayland
