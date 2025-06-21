/**
 * Motion Sync UI Manager
 * Handles UI elements for motion sync controls
 */

import { LAppMotionSync } from './lappmotionsync';
import { CubismModel } from '@framework/model/cubismmodel';
import { CubismFramework } from '@framework/live2dcubismframework';

export class LAppMotionSyncUI {
    private _container: HTMLDivElement;
    private _initButton: HTMLButtonElement;
    private _startButton: HTMLButtonElement;
    private _stopButton: HTMLButtonElement;
    private _testButton: HTMLButtonElement;
    private _statusDisplay: HTMLDivElement;
    private _motionSync: LAppMotionSync;
    private _model: CubismModel | null = null;

    constructor(motionSync: LAppMotionSync) {
        this._motionSync = motionSync;
        this.createUI();
    }

    /**
     * Create motion sync UI elements
     */
    private createUI(): void {
        // Create container
        this._container = document.createElement('div');
        this._container.style.position = 'absolute';
        this._container.style.top = '10px';
        this._container.style.right = '10px';
        this._container.style.zIndex = '1000';
        this._container.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        this._container.style.color = 'white';
        this._container.style.padding = '10px';
        this._container.style.borderRadius = '5px';
        this._container.style.fontFamily = 'Arial, sans-serif';
        this._container.style.fontSize = '12px';

        // Create title
        const title = document.createElement('div');
        title.textContent = 'Motion Sync Controls';
        title.style.fontWeight = 'bold';
        title.style.marginBottom = '10px';
        this._container.appendChild(title);

        // Create initialize button
        this._initButton = document.createElement('button');
        this._initButton.textContent = 'Initialize Motion Sync';
        this._initButton.style.margin = '2px';
        this._initButton.style.padding = '5px 10px';
        this._initButton.style.backgroundColor = '#007bff';
        this._initButton.style.color = 'white';
        this._initButton.style.border = 'none';
        this._initButton.style.borderRadius = '3px';
        this._initButton.style.cursor = 'pointer';
        this._initButton.onclick = () => this.initializeMotionSync();
        this._container.appendChild(this._initButton);

        // Create start button
        this._startButton = document.createElement('button');
        this._startButton.textContent = 'Start Motion Sync';
        this._startButton.style.margin = '2px';
        this._startButton.style.padding = '5px 10px';
        this._startButton.style.backgroundColor = '#28a745';
        this._startButton.style.color = 'white';
        this._startButton.style.border = 'none';
        this._startButton.style.borderRadius = '3px';
        this._startButton.style.cursor = 'pointer';
        this._startButton.disabled = true;
        this._startButton.onclick = () => this.startMotionSync();
        this._container.appendChild(this._startButton);

        // Create stop button
        this._stopButton = document.createElement('button');
        this._stopButton.textContent = 'Stop Motion Sync';
        this._stopButton.style.margin = '2px';
        this._stopButton.style.padding = '5px 10px';
        this._stopButton.style.backgroundColor = '#dc3545';
        this._stopButton.style.color = 'white';
        this._stopButton.style.border = 'none';
        this._stopButton.style.borderRadius = '3px';
        this._stopButton.style.cursor = 'pointer';
        this._stopButton.disabled = true;
        this._stopButton.onclick = () => this.stopMotionSync();
        this._container.appendChild(this._stopButton);

        // Create test parameter button
        this._testButton = document.createElement('button');
        this._testButton.textContent = 'Test Parameter Setting';
        this._testButton.style.margin = '2px';
        this._testButton.style.padding = '5px 10px';
        this._testButton.style.backgroundColor = '#ffc107';
        this._testButton.style.color = 'black';
        this._testButton.style.border = 'none';
        this._testButton.style.borderRadius = '3px';
        this._testButton.style.cursor = 'pointer';
        this._testButton.onclick = () => this.testParameterSetting();
        this._container.appendChild(this._testButton);

        // Create status display
        this._statusDisplay = document.createElement('div');
        this._statusDisplay.textContent = 'Status: Ready';
        this._statusDisplay.style.marginTop = '10px';
        this._statusDisplay.style.padding = '5px';
        this._statusDisplay.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        this._statusDisplay.style.borderRadius = '3px';
        this._container.appendChild(this._statusDisplay);

        // Add to document
        document.body.appendChild(this._container);
    }

    /**
     * Set model reference
     */
    public setModel(model: CubismModel): void {
        this._model = model;
    }

    /**
     * Initialize motion sync
     */
    private async initializeMotionSync(): Promise<void> {
        if (!this._model) {
            this.updateStatus('Model not ready');
            return;
        }

        this.updateStatus('Initializing motion sync...');
        this._initButton.disabled = true;

        try {
            const motionSyncUrl = 'https://cubism.live2d.com/sdk-web/sample-resources/kei_vowels_pro/kei_vowels_pro.motion3.json';
            const success = await this._motionSync.initialize(this._model, motionSyncUrl);

            if (success) {
                this.updateStatus('Motion sync initialized');
                this._startButton.disabled = false;
            } else {
                this.updateStatus('Failed to initialize motion sync');
                this._initButton.disabled = false;
            }
        } catch (error) {
            this.updateStatus(`Error: ${error}`);
            this._initButton.disabled = false;
        }
    }

    /**
     * Start motion sync
     */
    private async startMotionSync(): Promise<void> {
        this.updateStatus('Starting motion sync...');
        this._startButton.disabled = true;

        try {
            const success = await this._motionSync.start();

            if (success) {
                this.updateStatus('Motion sync started');
                this._stopButton.disabled = false;
            } else {
                this.updateStatus('Failed to start motion sync');
                this._startButton.disabled = false;
            }
        } catch (error) {
            this.updateStatus(`Error: ${error}`);
            this._startButton.disabled = false;
        }
    }

    /**
     * Stop motion sync
     */
    private stopMotionSync(): void {
        this._motionSync.stop();
        this.updateStatus('Motion sync stopped');
        this._startButton.disabled = false;
        this._stopButton.disabled = true;
    }

    /**
     * Test parameter setting
     */
    private testParameterSetting(): void {
        if (this._model) {
            // Test setting a simple parameter
            try {
                const paramId = CubismFramework.getIdManager().getId('ParamMouthOpenY');
                if (paramId) {
                    this._model.setParameterValueById(paramId, 1.0);
                    this.updateStatus('Test parameter set successfully');
                } else {
                    this.updateStatus('Parameter not found');
                }
            } catch (error) {
                this.updateStatus(`Test error: ${error}`);
            }
        } else {
            this.updateStatus('Model not ready');
        }
    }

    /**
     * Update status display
     */
    private updateStatus(message: string): void {
        this._statusDisplay.textContent = `Status: ${message}`;
        console.log(`[UI] ${message}`);
    }
} 