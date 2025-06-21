# BASIC MOUTH TEST - Làm sao để model mở miệng

## Mục tiêu
**Tìm cách để Live2D model mở miệng bằng bất kỳ cách nào**

## Bước test đơn giản nhất

### 1. Mở app
- Đi tới: `http://localhost:5003` (hoặc port hiện tại trong terminal)
- Mở console (F12)
- Đợi model load xong

### 2. Click "Test Parameter Setting" button
- Sẽ chạy test toàn diện
- Xem console logs chi tiết

### 3. Những gì test sẽ làm:

#### Test A: Kiểm tra model có parameters không
```
[TEST] Model has X parameters
```

#### Test B: Liệt kê 10 parameters đầu tiên
```
[TEST] Parameter 0: ID=[object], Value=0.5
[TEST] Parameter 1: ID=[object], Value=0.2
...
```

#### Test C: Test xem có thể set parameter không
```
[TEST] Testing parameter setting on first parameter...
[TEST] Old value: 0.5
[TEST] New value after setting to 1.0: 1.0
[TEST] ✅ Parameter setting WORKS! Parameter can be changed.
```

#### Test D: Tìm mouth parameters
Sẽ test các tên phổ biến:
- ParamMouthOpenY
- ParamMouthOpen
- PARAM_MOUTH_OPEN_Y
- PARAM_MOUTH_OPEN
- MouthOpen
- mouth_open
- Mouth

#### Test E: Nếu tìm được mouth parameter
```
[TEST] ✅ Found parameter: ParamMouthOpenY
[TEST] ParamMouthOpenY: 0.0 -> 1.0
[TEST] ✅✅ SUCCESS! ParamMouthOpenY can be set to 1.0
[TEST] 🎉 THIS SHOULD MAKE THE MOUTH OPEN!
```

**Miệng sẽ mở trong 2 giây rồi đóng lại**

## Kết quả mong đợi

### ✅ THÀNH CÔNG:
- Console hiện: `🎉 THIS SHOULD MAKE THE MOUTH OPEN!`
- **Model mở miệng trong 2 giây**
- Tìm được parameter name hoạt động

### ❌ THẤT BẠI:
- Console hiện: `❌ No working mouth parameters found`
- Model không mở miệng
- Cần debug sâu hơn

## Báo cáo kết quả:

**Hãy cho biết:**
1. Console logs bạn thấy được (copy paste)
2. Model có mở miệng không? (Yes/No)
3. Có thấy message `🎉 THIS SHOULD MAKE THE MOUTH OPEN!` không?
4. Có error nào không?

## Nếu test này không work:
- Vấn đề ở cấp độ cơ bản nhất
- Model không load đúng hoặc parameters không accessible
- Cần check model loading process 