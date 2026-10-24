set -e
mkdir -p www assets
cp index.html manifest.json sw.js icon-192.png icon-512.png www/
cp icon-1024.png assets/icon.png
cp splash-2732.png assets/splash.png
npm install
node make-fonts.js
sed -i '/fonts.googleapis.com\/css2/d' www/index.html
sed -i 's#</head>#<link rel="stylesheet" href="fonts.css"></head>#' www/index.html
npx cap add android
npx -y @capacitor/assets@3 generate --android --iconBackgroundColor '#c1bca8' --iconBackgroundColorDark '#c1bca8' --splashBackgroundColor '#c1bca8' --splashBackgroundColorDark '#c1bca8' || true
mkdir -p ~/.android
[ -f debug.keystore ] && cp debug.keystore ~/.android/debug.keystore
sed -i 's#</manifest>#<uses-permission android:name="android.permission.POST_NOTIFICATIONS"/><uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED"/><uses-permission android:name="android.permission.SCHEDULE_EXACT_ALARM"/><uses-permission android:name="android.permission.USE_EXACT_ALARM"/><uses-permission android:name="android.permission.VIBRATE"/></manifest>#' android/app/src/main/AndroidManifest.xml
npx cap sync android
cd android
chmod +x gradlew
./gradlew assembleDebug --no-daemon
