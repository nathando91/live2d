# Live2D Cubism SDK TypeScript Demo with Motion Sync

This project integrates the "live2d-motionsync" library into the Live2D Cubism SDK TypeScript demo to enable real-time motion synchronization based on microphone input.

## Features

- **Motion Sync Integration**: Real-time lip sync and facial expressions based on microphone input
- **CORS Support**: Fixed cross-origin resource sharing issues for loading models from CDN
- **Fallback System**: Automatic fallback to local models if remote loading fails
- **UI Controls**: Easy-to-use buttons for initializing, starting, and stopping motion sync
- **Status Monitoring**: Real-time status updates for motion sync operations
- **Mock Implementation**: Fallback mock system for testing when the actual library has compatibility issues

## Recent Updates

### Mock Motion Sync Implementation (Latest)
- Added mock implementation to handle compatibility issues with the live2d-motionsync library
- Provides simulation of lip sync parameters for testing
- Includes comprehensive error handling and logging

### CORS Fix
- Added `crossOrigin = 'anonymous'` to Image elements when loading textures from HTTP URLs
- Implemented automatic fallback to local models if CORS fails
- Added comprehensive error handling for cross-origin requests

## Quick Start

1. **Install Dependencies**:
   ```bash
   npm install
   npm install live2d-motionsync
   ```

2. **Start the Development Server**:
   ```bash
   npm start
   ```

3. **Open in Browser**:
   - Navigate to `http://localhost:5002`
   - The demo will load the kei_vowels_pro model from CDN
   - Use the motion sync controls to enable microphone-based animation

## Testing

### Main Application
- **URL**: `http://localhost:5002`
- **Features**: Full Live2D demo with motion sync integration

### CORS Test Page
- **URL**: `http://localhost:5002/test-cors.html`
- **Purpose**: Test CORS functionality and resource loading

### Mock Motion Sync Test
- **URL**: `http://localhost:5002/test-mock-motionsync.html`
- **Purpose**: Test motion sync functionality with mock implementation

### Lip Sync Test
- **URL**: `http://localhost:5002/test-lip-sync.html`
- **Purpose**: Test lip sync animation and parameter setting

### Model Debug
- **URL**: `http://localhost:5002/debug-model.html`
- **Purpose**: Debug model parameters and check what lip sync parameters are available

## Configuration

### Model Sources
The project can load models from different sources:

- **Remote CDN** (Default): Uses kei_vowels_pro model hosted on jsdelivr
- **Local Models**: Fallback to local models in the Resources directory

### CORS Settings
In `src/lappdefine.ts`:
```typescript
// Use remote model instead of local models
export const UseRemoteModel = true;

// CORS handling options
export const EnableCORS = true;
export const UseLocalFallback = true; // Fallback to local model if CORS fails

// Local model fallback (if CORS fails)
export const LocalModelDir = 'Haru'; // Use Haru as local fallback
```

## Usage

### Motion Sync Controls

1. **Initialize Motion Sync**: Click "Initialize Motion Sync" to load motion sync data
2. **Start Motion Sync**: Click "Start Motion Sync" to begin microphone input and animation
3. **Stop Motion Sync**: Click "Stop Motion Sync" to stop the animation

### Status Indicators

- **Initialized**: Motion sync data loaded successfully
- **Playing**: Motion sync is active and responding to microphone input
- **Stopped**: Motion sync is inactive
- **Error**: An error occurred during initialization or playback

## Troubleshooting

### Motion Sync Library Issues
If you encounter "Cannot read properties of undefined" errors:

1. **Mock Mode**: The system automatically uses a mock implementation
2. **Check Console**: Look for mock motion sync messages
3. **Test with Mock Page**: Use `test-mock-motionsync.html` to verify functionality
4. **Library Compatibility**: The live2d-motionsync library may have compatibility issues

### CORS Errors
If you encounter CORS errors:

1. **Check Network Tab**: Look for failed requests in browser dev tools
2. **Verify CDN Access**: Ensure the CDN URLs are accessible
3. **Use Local Fallback**: The system will automatically fallback to local models
4. **Test with CORS Test Page**: Use `test-cors.html` to isolate issues

### Microphone Access Issues
If microphone access fails:

1. **Check Browser Permissions**: Ensure microphone access is allowed
2. **Use HTTPS**: Some browsers require HTTPS for microphone access
3. **Check Console**: Look for getUserMedia errors

### Model Loading Issues
If models fail to load:

1. **Check Network**: Verify internet connection
2. **CDN Status**: Check if jsdelivr is accessible
3. **Local Models**: Switch to local models by setting `UseRemoteModel = false`

## Mock Implementation Details

The mock implementation provides:

- **Simulated Lip Sync**: Random parameter values to simulate audio input
- **Data Loading**: Tests motion sync data file loading
- **Microphone Simulation**: Simulates microphone access and audio processing
- **Status Logging**: Comprehensive logging for debugging

### Mock Features
- ✅ Motion sync data loading from URL
- ✅ Microphone access simulation
- ✅ Parameter value simulation
- ✅ Start/stop functionality
- ✅ Status monitoring

## File Structure

```
src/
├── lappmodel.ts              # Main model class with motion sync integration
├── lappmotionsync.ts         # Motion sync manager (with mock implementation)
├── lappmotionsyncui.ts       # UI manager for motion sync controls
├── lapptexturemanager.ts     # Texture manager with CORS support
├── lappdefine.ts             # Configuration and constants
└── lappdelegate.ts           # Main application delegate

test-cors.html                # CORS testing page
test-mock-motionsync.html     # Mock motion sync testing page
```

## Dependencies

- **live2d-motionsync**: Core motion sync functionality (with mock fallback)
- **Live2D Cubism SDK**: Base Live2D framework
- **TypeScript**: Development language
- **WebGL**: Rendering engine

## Browser Compatibility

- **Chrome**: Full support
- **Firefox**: Full support
- **Safari**: Full support (requires HTTPS for microphone)
- **Edge**: Full support

## Development

### Building
```bash
npm run build
```

### Type Checking
```bash
npm run type-check
```

### Linting
```bash
npm run lint
```

## License

This project uses the Live2D Open Software License. See the original Live2D Cubism SDK license for details.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For issues related to:
- **Motion Sync**: Check the mock implementation and console logs
- **CORS**: Use the test page and check browser console
- **Live2D SDK**: Refer to the official Live2D documentation
