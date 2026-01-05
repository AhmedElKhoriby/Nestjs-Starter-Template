#!/bin/bash
# 🚀 بدء سريع - تشغيل RDP

echo "🚀 تشغيل RDP للموبايل كشاشة ثانية..."
echo ""

# التحقق من الخدمة
if systemctl --user is-active gnome-remote-desktop > /dev/null 2>&1; then
    echo "✅ الخدمة شغّالة"
else
    echo "⚙️  تشغيل الخدمة..."
    systemctl --user start gnome-remote-desktop
    sleep 2
fi

# التحقق من RDP
grdctl rdp enable > /dev/null 2>&1

# عرض المعلومات
echo ""
echo "╔═══════════════════════════════════════╗"
echo "║  📱 معلومات الاتصال من الموبايل      ║"
echo "╚═══════════════════════════════════════╝"
echo ""
echo "🌐 IP Address: $(ip addr show | grep 'inet 192.168' | head -1 | awk '{print $2}' | cut -d'/' -f1)"
echo "🔌 Port: 3389"
echo "👤 Username: ahmed"
echo "🔐 Password: password123"
echo ""
echo "✅ RDP جاهز! افتح Microsoft Remote Desktop على الموبايل وأدخل المعلومات أعلاه"
echo ""
