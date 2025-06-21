# Live2D Motion Sync Integration

Dự án này đã được tích hợp motion sync để cho phép Live2D model phản ứng với giọng nói thông qua microphone.

## 🎯 Tính năng

- **Motion Sync**: Model sẽ phản ứng với giọng nói của bạn
- **Microphone Input**: Sử dụng microphone để nhận audio input
- **Real-time Processing**: Xử lý audio real-time để tạo motion
- **UI Controls**: Giao diện điều khiển đơn giản
- **Remote Model**: Sử dụng model kei_vowels_pro từ CDN

## 🚀 Cách sử dụng

1. **Khởi động dự án**:
   ```bash
   npm start
   ```

2. **Mở trình duyệt** và truy cập `http://localhost:5002` (hoặc port khác)

3. **Sử dụng Motion Sync**:
   - Đợi model kei_vowels_pro load xong
   - Nhấn "Initialize Motion Sync" để khởi tạo
   - Nhấn "Start Motion Sync" để bắt đầu (cần cấp quyền microphone)
   - Nói vào microphone và xem model phản ứng với các nguyên âm (A, I, U, E, O)
   - Nhấn "Stop Motion Sync" để dừng

## 📁 Cấu trúc code

### Files chính:
- `src/lappmotionsync.ts`: Quản lý motion sync
- `src/motionsyncui.ts`: Giao diện điều khiển
- `src/lappmodel.ts`: Tích hợp motion sync vào model
- `src/lappdelegate.ts`: Khởi tạo motion sync UI
- `src/lappdefine.ts`: Cấu hình model và motion sync URLs

### Model được sử dụng:
- **Model**: [kei_vowels_pro](https://cdn.jsdelivr.net/gh/liyao1520/live2d-motionSync/examples/public/models/kei_vowels_pro/kei_vowels_pro.model3.json)
- **Motion Sync Data**: [kei_vowels_pro.motionsync3.json](https://cdn.jsdelivr.net/gh/liyao1520/live2d-motionSync/examples/public/models/kei_vowels_pro/kei_vowels_pro.motionsync3.json)

### Các phương thức chính:

#### LAppMotionSync
- `initialize(model, motionSyncUrl)`: Khởi tạo motion sync với model
- `start()`: Bắt đầu motion sync với microphone
- `stop()`: Dừng motion sync
- `isPlaying()`: Kiểm tra trạng thái đang chạy
- `isInitialized()`: Kiểm tra đã khởi tạo chưa

#### LAppModel
- `loadAssetsFromUrl(url)`: Load model từ URL
- `initializeMotionSync(url)`: Khởi tạo motion sync cho model
- `startMotionSync()`: Bắt đầu motion sync
- `stopMotionSync()`: Dừng motion sync
- `isMotionSyncPlaying()`: Kiểm tra trạng thái
- `isMotionSyncInitialized()`: Kiểm tra đã khởi tạo

## ⚙️ Cấu hình

### Thay đổi model:
Trong file `src/lappdefine.ts`, thay đổi các URL:

```typescript
export const ModelUrl = 'https://your-model-url.model3.json';
export const MotionSyncUrl = 'https://your-motion-sync-url.motionsync3.json';
export const UseRemoteModel = true; // Set to false to use local models
```

### Sử dụng model local:
```typescript
export const UseRemoteModel = false;
// Model sẽ được load từ LAppDefine.ModelDir
```

## 🎵 Motion Sync Features

Model kei_vowels_pro hỗ trợ:
- **Nguyên âm**: A, I, U, E, O
- **Mouth Open**: ParamMouthOpenY
- **Silence detection**: Tự động đóng miệng khi im lặng
- **Real-time processing**: Phản ứng ngay lập tức với giọng nói

## 📱 Lưu ý

1. **Microphone Permission**: Trình duyệt sẽ yêu cầu quyền truy cập microphone
2. **HTTPS**: Motion sync hoạt động tốt nhất trên HTTPS
3. **Browser Support**: Hỗ trợ các trình duyệt hiện đại với Web Audio API
4. **Network**: Cần kết nối internet để load model từ CDN

## 🔧 Troubleshooting

### Không thể truy cập microphone:
- Kiểm tra quyền microphone trong trình duyệt
- Đảm bảo trang web chạy trên HTTPS (cho production)

### Model không load:
- Kiểm tra kết nối internet
- Kiểm tra console để xem lỗi network
- Thử refresh trang

### Motion sync không hoạt động:
- Kiểm tra console để xem lỗi
- Đảm bảo model đã load xong trước khi khởi tạo motion sync
- Kiểm tra URL motion sync data có đúng không

### Model không phản ứng:
- Đảm bảo microphone đang hoạt động
- Kiểm tra âm lượng microphone
- Thử nói các nguyên âm rõ ràng: A, I, U, E, O
- Đảm bảo không có tiếng ồn xung quanh

## 📦 Dependencies

- `live2d-motionsync`: Thư viện motion sync chính
- Live2D Cubism SDK: Framework Live2D

## 📄 License

Tuân theo Live2D Open Software License Agreement.

## 🔗 Links

- [Model kei_vowels_pro](https://cdn.jsdelivr.net/gh/liyao1520/live2d-motionSync/examples/public/models/kei_vowels_pro/kei_vowels_pro.model3.json)
- [Motion Sync Data](https://cdn.jsdelivr.net/gh/liyao1520/live2d-motionSync/examples/public/models/kei_vowels_pro/kei_vowels_pro.motionsync3.json)
- [Live2D Motion Sync Repository](https://github.com/liyao1520/live2d-motionSync) 