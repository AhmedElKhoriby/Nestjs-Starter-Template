#!/bin/bash

# 🖥️ سكريبت إدارة RDP للموبايل كشاشة ثانية
# Remote Desktop Quick Manager

# ألوان للعرض
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# دالة لعرض الحالة
show_status() {
    echo -e "${BLUE}═══════════════════════════════════════${NC}"
    echo -e "${GREEN}   📊 حالة RDP الحالية${NC}"
    echo -e "${BLUE}═══════════════════════════════════════${NC}"
    grdctl status --show-credentials
    echo ""
    echo -e "${YELLOW}🔌 البورت 3389:${NC}"
    if ss -tln | grep -q 3389; then
        echo -e "${GREEN}✅ مفتوح - RDP شغّال${NC}"
    else
        echo -e "${RED}❌ مغلق - RDP متوقف${NC}"
    fi
    echo ""
    echo -e "${YELLOW}🌐 عنوان IP:${NC}"
    ip addr show | grep "inet 192.168" | awk '{print $2}' | cut -d'/' -f1 | while read ip; do
        echo -e "${GREEN}   $ip${NC}"
    done
    echo -e "${BLUE}═══════════════════════════════════════${NC}"
}

# دالة لتشغيل RDP
start_rdp() {
    echo -e "${YELLOW}🚀 تشغيل RDP...${NC}"
    grdctl rdp enable > /dev/null 2>&1
    grdctl rdp disable-view-only > /dev/null 2>&1
    systemctl --user restart gnome-remote-desktop
    sleep 2
    
    if ss -tln | grep -q 3389; then
        echo -e "${GREEN}✅ تم تشغيل RDP بنجاح!${NC}"
        echo ""
        show_status
    else
        echo -e "${RED}❌ فشل تشغيل RDP${NC}"
    fi
}

# دالة لإيقاف RDP
stop_rdp() {
    echo -e "${YELLOW}🛑 إيقاف RDP...${NC}"
    grdctl rdp disable > /dev/null 2>&1
    systemctl --user stop gnome-remote-desktop
    echo -e "${GREEN}✅ تم إيقاف RDP${NC}"
}

# دالة لإعادة التشغيل
restart_rdp() {
    echo -e "${YELLOW}🔄 إعادة تشغيل RDP...${NC}"
    systemctl --user restart gnome-remote-desktop
    sleep 2
    if ss -tln | grep -q 3389; then
        echo -e "${GREEN}✅ تمت إعادة التشغيل بنجاح!${NC}"
    else
        echo -e "${RED}❌ فشلت إعادة التشغيل${NC}"
    fi
}

# دالة لتغيير الباسورد
change_password() {
    echo -e "${YELLOW}🔐 تغيير بيانات الدخول${NC}"
    echo -n "اسم المستخدم: "
    read username
    echo -n "كلمة المرور: "
    read -s password
    echo ""
    
    grdctl rdp set-credentials "$username" "$password" > /dev/null 2>&1
    echo -e "${GREEN}✅ تم تغيير بيانات الدخول${NC}"
    systemctl --user restart gnome-remote-desktop
}

# دالة لتغيير وضع الشاشة
change_mode() {
    echo -e "${YELLOW}📺 تغيير وضع الشاشة${NC}"
    echo "1) Mirror (مرآة)"
    echo "2) Extend (توسيع)"
    echo -n "اختر (1 أو 2): "
    read choice
    
    case $choice in
        1)
            gsettings set org.gnome.desktop.remote-desktop.rdp screen-share-mode 'mirror-primary'
            echo -e "${GREEN}✅ تم التغيير إلى وضع Mirror${NC}"
            ;;
        2)
            gsettings set org.gnome.desktop.remote-desktop.rdp screen-share-mode 'extend'
            echo -e "${GREEN}✅ تم التغيير إلى وضع Extend${NC}"
            ;;
        *)
            echo -e "${RED}❌ اختيار غير صحيح${NC}"
            return
            ;;
    esac
    
    systemctl --user restart gnome-remote-desktop
}

# القائمة الرئيسية
show_menu() {
    clear
    echo -e "${BLUE}"
    echo "╔════════════════════════════════════════╗"
    echo "║   🖥️  إدارة RDP - شاشة ثانية          ║"
    echo "╚════════════════════════════════════════╝"
    echo -e "${NC}"
    echo "1) 📊 عرض الحالة"
    echo "2) 🚀 تشغيل RDP"
    echo "3) 🛑 إيقاف RDP"
    echo "4) 🔄 إعادة تشغيل RDP"
    echo "5) 🔐 تغيير بيانات الدخول"
    echo "6) 📺 تغيير وضع الشاشة"
    echo "7) 🚪 خروج"
    echo ""
    echo -n "اختر رقم (1-7): "
}

# البرنامج الرئيسي
main() {
    while true; do
        show_menu
        read choice
        echo ""
        
        case $choice in
            1) show_status ;;
            2) start_rdp ;;
            3) stop_rdp ;;
            4) restart_rdp ;;
            5) change_password ;;
            6) change_mode ;;
            7) 
                echo -e "${GREEN}وداعاً! 👋${NC}"
                exit 0
                ;;
            *)
                echo -e "${RED}❌ اختيار غير صحيح${NC}"
                ;;
        esac
        
        echo ""
        echo -n "اضغط Enter للمتابعة..."
        read
    done
}

# تشغيل البرنامج
main
