# Motion Sync Debug Steps - NEW SIMPLIFIED APPROACH

## Current Status
- ✅ **NEW**: Simplified direct parameter control approach
- ✅ Removed complex mock simulation 
- ✅ Focus on basic mouth open/close animation
- ✅ Multiple parameter names testing
- ✅ Build successful
- 🔍 **TESTING**: Direct parameter manipulation

## What Changed
- **OLD**: Complex vowel simulation with motion sync data
- **NEW**: Simple mouth open/close every 1 second
- **FOCUS**: Test if we can control ANY mouth parameter directly

## Debug Steps to Follow

### 1. Open the App
1. Go to `http://localhost:5002` (or check terminal for correct port)
2. Open browser console (F12)
3. Wait for model to load completely

### 2. Test Parameter Setting First
1. Click "Test Parameter Setting" button
2. Look for console logs:
   ```
   [TEST] === TESTING PARAMETER SETTING ===
   [TEST] Model: Valid
   [TEST] Parameter ID: [object]
   [TEST] Current value: X.XX
   [TEST] Set value to 1.0
   [TEST] New value: 1.0
   [TEST] ✅ Parameter setting successful
   ```
3. **CRITICAL**: Check if character's mouth opens when you click this button
   - If mouth opens → Basic parameter setting works ✅
   - If mouth doesn't open → Basic parameter setting is broken ❌

### 3. Initialize Motion Sync (Simplified)
1. Click "Initialize Motion Sync" button
2. Look for console logs:
   ```
   [MOTION_SYNC] === SIMPLE INITIALIZE ===
   [MOTION_SYNC] Model: Valid
   [MOTION_SYNC] ✅ Model set successfully
   ```

### 4. Start Simple Motion Test
1. Click "Start Motion Sync" button
2. Allow microphone access (even though we don't use it)
3. Look for console logs:
   ```
   [MOTION_SYNC] === SIMPLE START ===
   [MOTION_SYNC] Microphone access granted
   [MOTION_SYNC] Starting simple mouth animation...
   [MOTION_SYNC] Animation interval set up
   [MOTION_SYNC] ✅ Simple animation started
   ```

### 5. Check Animation Loop (Every 1 Second)
You should see this pattern repeating every 1 second:
```
[MOTION_SYNC] === ANIMATION STEP 1 ===
[MOTION_SYNC] Setting mouth to: OPEN (1)
[MOTION_SYNC] --- Setting ParamMouthOpenY ---
[MOTION_SYNC] Parameter ID for ParamMouthOpenY: Found
[MOTION_SYNC] Current value: 0
[MOTION_SYNC] Set value to: 1
[MOTION_SYNC] Verified value: 1
[MOTION_SYNC] ✅ ParamMouthOpenY successfully set to 1
[MOTION_SYNC] --- Setting ParamMouthOpen ---
[MOTION_SYNC] --- Setting ParamMouthForm ---
[MOTION_SYNC] --- Setting PARAM_MOUTH_OPEN_Y ---
[MOTION_SYNC] --- Setting PARAM_MOUTH_OPEN ---
[MOTION_SYNC] Animation step 1 complete
```

Then 1 second later:
```
[MOTION_SYNC] === ANIMATION STEP 2 ===
[MOTION_SYNC] Setting mouth to: CLOSED (0)
[MOTION_SYNC] ✅ ParamMouthOpenY successfully set to 0
```

## Expected Visual Result
- **Character's mouth should open and close every 1 second**
- **Clear, visible animation: OPEN → CLOSED → OPEN → CLOSED**
- **No complex vowel shapes, just basic open/close**

## Key Success Indicators

### ✅ Success Messages to Look For
- `✅ Parameter setting successful` (from test button)
- `✅ ParamMouthOpenY successfully set to 1`
- `✅ ParamMouthOpenY successfully set to 0`
- Animation steps counting up: `ANIMATION STEP 1`, `ANIMATION STEP 2`, etc.

### ❌ Failure Messages to Watch For
- `❌ No model available`
- `❌ ParamMouthOpenY not found or model null`
- `❌ Parameter setting failed`
- No animation step messages appearing

## Troubleshooting

### If Test Parameter Button Works But Animation Doesn't
- Basic parameter setting works
- Issue is in the animation loop
- Check for interval callback messages

### If Test Parameter Button Doesn't Work
- Root cause is in basic model/parameter access
- Check model loading and initialization

### If Parameters Set But No Visual Change
- Parameters are being set correctly
- Issue might be in render pipeline or parameter names
- Check if any parameter actually works

## Next Steps Based on Results

### If This Simple Approach Works
- We know parameter setting works
- Can build up to more complex motion sync
- Add vowel shapes and real audio input

### If This Simple Approach Doesn't Work
- Need to investigate model parameter access
- Check different parameter naming conventions
- Verify model update/render cycle

## Report Back With
1. **Does the test parameter button make the mouth open?** (Yes/No)
2. **Do you see animation step messages in console?** (Yes/No)
3. **Does the mouth open/close every second visually?** (Yes/No)
4. **Any error messages in console?** (Copy paste them)

This simplified approach will help us identify exactly where the issue is! 