/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

import { LAppLive2DManager } from './lapplive2dmanager';
import { LAppPal } from './lapppal';
import * as LAppDefine from './lappdefine';

/**
 * Motion Sync UI Manager
 * Handles the UI controls for motion sync functionality
 */
export class LAppMotionSyncUI {
    private _initButton: HTMLButtonElement | null = null;
    private _startButton: HTMLButtonElement | null = null;
    private _stopButton: HTMLButtonElement | null = null;
    private _statusDiv: HTMLDivElement | null = null;
    private _live2DManager: LAppLive2DManager | null = null;

    /**
     * Constructor
     */
    public constructor() {
        this._initButton = null;
        this._startButton = null;
        this._stopButton = null;
        this._statusDiv = null;
        this._live2DManager = null;
    }

    /**
     * Initialize the UI
     * @param live2DManager Live2D manager instance
     */
    public initialize(live2DManager: LAppLive2DManager): void {
        this._live2DManager = live2DManager;

        // Get UI elements
        this._initButton = document.getElementById('initMotionSync') as HTMLButtonElement;
        this._startButton = document.getElementById('startMotionSync') as HTMLButtonElement;
        this._stopButton = document.getElementById('stopMotionSync') as HTMLButtonElement;
        this._statusDiv = document.getElementById('status') as HTMLDivElement;

        if (!this._initButton || !this._startButton || !this._stopButton || !this._statusDiv) {
            LAppPal.printMessage('[MOTION_SYNC_UI] Failed to find UI elements');
            return;
        }

        // Add event listeners
        this._initButton.addEventListener('click', () => this.onInitClick());
        this._startButton.addEventListener('click', () => this.onStartClick());
        this._stopButton.addEventListener('click', () => this.onStopClick());

        this.updateStatus('Ready to initialize motion sync');
    }

    /**
     * Handle initialize button click
     */
    private async onInitClick(): Promise<void> {
        if (!this._live2DManager) return;

        const model = this._live2DManager._models.at(0);
        if (!model) {
            this.updateStatus('No model loaded');
            return;
        }

        // Check if model is ready
        if (model._state !== 22) { // LoadStep.CompleteSetup = 22
            this.updateStatus('Model not ready yet, please wait...');
            return;
        }

        this.updateStatus('Initializing motion sync...');
        this.setButtonEnabled(this._initButton, false);

        try {
            // URL to motion sync data - you can change this to use your own model's motion sync data
            const motionSyncUrl = LAppDefine.MotionSyncUrl;

            const success = await model.initializeMotionSync(motionSyncUrl);

            if (success) {
                this.updateStatus('Motion sync initialized successfully');
                this.setButtonEnabled(this._startButton, true);
                this.setButtonEnabled(this._stopButton, false);
            } else {
                this.updateStatus('Failed to initialize motion sync');
                this.setButtonEnabled(this._initButton, true);
            }
        } catch (error) {
            this.updateStatus(`Error: ${error}`);
            this.setButtonEnabled(this._initButton, true);
        }
    }

    /**
     * Handle start button click
     */
    private async onStartClick(): Promise<void> {
        if (!this._live2DManager) return;

        const model = this._live2DManager._models.at(0);
        if (!model) {
            this.updateStatus('No model loaded');
            return;
        }

        this.updateStatus('Starting motion sync...');
        this.setButtonEnabled(this._startButton, false);

        try {
            const success = await model.startMotionSync();

            if (success) {
                this.updateStatus('Motion sync started - speak into your microphone');
                this.setButtonEnabled(this._stopButton, true);
            } else {
                this.updateStatus('Failed to start motion sync - check microphone permissions');
                this.setButtonEnabled(this._startButton, true);
            }
        } catch (error) {
            this.updateStatus(`Error: ${error}`);
            this.setButtonEnabled(this._startButton, true);
        }
    }

    /**
     * Handle stop button click
     */
    private onStopClick(): void {
        if (!this._live2DManager) return;

        const model = this._live2DManager._models.at(0);
        if (!model) {
            this.updateStatus('No model loaded');
            return;
        }

        model.stopMotionSync();
        this.updateStatus('Motion sync stopped');
        this.setButtonEnabled(this._startButton, true);
        this.setButtonEnabled(this._stopButton, false);
    }

    /**
     * Update status text
     */
    private updateStatus(message: string): void {
        if (this._statusDiv) {
            this._statusDiv.textContent = message;
        }
        LAppPal.printMessage(`[MOTION_SYNC_UI] ${message}`);
    }

    /**
     * Enable or disable a button
     */
    private setButtonEnabled(button: HTMLButtonElement | null, enabled: boolean): void {
        if (!button) return;

        if (enabled) {
            button.disabled = false;
            button.classList.remove('btn-disabled');
        } else {
            button.disabled = true;
            button.classList.add('btn-disabled');
        }
    }

    /**
     * Update UI based on model state
     */
    public updateUI(): void {
        if (!this._live2DManager) return;

        const model = this._live2DManager._models.at(0);
        if (!model) return;

        // Check if model is ready (CompleteSetup state)
        const isModelReady = model._state === 22; // LoadStep.CompleteSetup = 22

        // Update button states based on motion sync state
        if (model.isMotionSyncInitialized()) {
            this.setButtonEnabled(this._initButton, false);
            this.setButtonEnabled(this._startButton, !model.isMotionSyncPlaying());
            this.setButtonEnabled(this._stopButton, model.isMotionSyncPlaying());
        } else {
            this.setButtonEnabled(this._initButton, isModelReady);
            this.setButtonEnabled(this._startButton, false);
            this.setButtonEnabled(this._stopButton, false);

            // Update status if model is not ready
            if (!isModelReady && this._statusDiv) {
                this._statusDiv.textContent = 'Waiting for model to load...';
            }
        }
    }
} 