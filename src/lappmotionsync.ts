/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

import { CubismModel } from '@framework/model/cubismmodel';
import { CubismIdHandle } from '@framework/id/cubismid';
import { CubismFramework } from '@framework/live2dcubismframework';
import * as LAppDefine from './lappdefine';
import { LAppPal } from './lapppal';

/**
 * Simple Motion Test - Direct parameter manipulation
 * Test if we can directly control Live2D model parameters
 */

/**
 * Simple Motion Sync - Direct Parameter Control
 * Focus on basic parameter manipulation without complex simulation
 */
export class LAppMotionSync {
    private _model: CubismModel | null = null;
    private _isPlaying: boolean = false;
    private _testInterval: number | null = null;

    /**
     * Constructor
     */
    public constructor() {
        this._model = null;
        this._isPlaying = false;
        this._testInterval = null;
    }

    /**
     * Initialize with model - simplified approach
     */
    public async initialize(model: CubismModel, motionSyncUrl: string): Promise<boolean> {
        console.log(`[MOTION_SYNC] === SIMPLE INITIALIZE ===`);
        console.log(`[MOTION_SYNC] Model: ${model ? 'Valid' : 'Null'}`);

        this._model = model;

        if (this._model) {
            console.log(`[MOTION_SYNC] ✅ Model set successfully`);
            LAppPal.printMessage('[MOTION_SYNC] Simple initialization complete');
            return true;
        } else {
            console.log(`[MOTION_SYNC] ❌ Model is null`);
            return false;
        }
    }

    /**
     * Start simple motion test
     */
    public async start(): Promise<boolean> {
        console.log(`[MOTION_SYNC] === SIMPLE START ===`);

        if (!this._model) {
            console.log(`[MOTION_SYNC] ❌ No model available`);
            return false;
        }

        if (this._isPlaying) {
            console.log(`[MOTION_SYNC] Already playing`);
            return false;
        }

        try {
            // Request microphone access (even though we won't use it for this test)
            await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true,
                },
            });

            console.log(`[MOTION_SYNC] Microphone access granted`);

            // Start simple parameter animation
            this.startSimpleAnimation();
            this._isPlaying = true;

            console.log(`[MOTION_SYNC] ✅ Simple animation started`);
            LAppPal.printMessage('[MOTION_SYNC] Simple motion test started');

            return true;
        } catch (error) {
            console.log(`[MOTION_SYNC] ❌ Failed to start: ${error}`);
            return false;
        }
    }

    /**
     * Start simple parameter animation - just mouth open/close
     */
    private startSimpleAnimation(): void {
        console.log(`[MOTION_SYNC] Starting simple mouth animation...`);

        let isOpen = false;
        let counter = 0;

        // Clear any existing interval
        if (this._testInterval) {
            clearInterval(this._testInterval);
        }

        // Simple animation: open/close mouth every second
        this._testInterval = setInterval(() => {
            if (!this._isPlaying || !this._model) {
                console.log(`[MOTION_SYNC] Animation stopped or model lost`);
                return;
            }

            counter++;
            isOpen = !isOpen;
            const value = isOpen ? 1.0 : 0.0;

            console.log(`[MOTION_SYNC] === ANIMATION STEP ${counter} ===`);
            console.log(`[MOTION_SYNC] Setting mouth to: ${isOpen ? 'OPEN' : 'CLOSED'} (${value})`);

            // Try multiple mouth-related parameters
            this.setMouthParameter('ParamMouthOpenY', value);
            this.setMouthParameter('ParamMouthOpen', value);
            this.setMouthParameter('ParamMouthForm', value);

            // Also try some basic parameters that should exist
            this.setMouthParameter('PARAM_MOUTH_OPEN_Y', value);
            this.setMouthParameter('PARAM_MOUTH_OPEN', value);

            console.log(`[MOTION_SYNC] Animation step ${counter} complete`);

        }, 1000); // Every 1 second for clear visibility

        console.log(`[MOTION_SYNC] Animation interval set up`);
    }

    /**
     * Set mouth parameter with extensive debugging
     */
    private setMouthParameter(paramName: string, value: number): void {
        try {
            console.log(`[MOTION_SYNC] --- Setting ${paramName} ---`);

            // Try to get parameter ID
            const paramId = CubismFramework.getIdManager().getId(paramName);
            console.log(`[MOTION_SYNC] Parameter ID for ${paramName}: ${paramId ? 'Found' : 'Not found'}`);

            if (paramId && this._model) {
                // Get current value
                const currentValue = this._model.getParameterValueById(paramId);
                console.log(`[MOTION_SYNC] Current value: ${currentValue}`);

                // Set new value
                this._model.setParameterValueById(paramId, value);
                console.log(`[MOTION_SYNC] Set value to: ${value}`);

                // Verify the value was set
                const newValue = this._model.getParameterValueById(paramId);
                console.log(`[MOTION_SYNC] Verified value: ${newValue}`);

                // Check if it actually changed
                if (Math.abs(newValue - value) < 0.01) {
                    console.log(`[MOTION_SYNC] ✅ ${paramName} successfully set to ${value}`);
                    LAppPal.printMessage(`[MOTION_SYNC] Set ${paramName}: ${value}`);
                } else {
                    console.log(`[MOTION_SYNC] ⚠️ ${paramName} value mismatch. Expected: ${value}, Got: ${newValue}`);
                }
            } else {
                console.log(`[MOTION_SYNC] ❌ ${paramName} not found or model null`);
            }
        } catch (error) {
            console.log(`[MOTION_SYNC] ❌ Error setting ${paramName}: ${error}`);
        }
    }

    /**
     * Stop motion test
     */
    public stop(): void {
        console.log(`[MOTION_SYNC] === STOPPING ===`);

        this._isPlaying = false;

        if (this._testInterval) {
            clearInterval(this._testInterval);
            this._testInterval = null;
            console.log(`[MOTION_SYNC] Animation interval cleared`);
        }

        // Reset mouth to closed
        if (this._model) {
            this.setMouthParameter('ParamMouthOpenY', 0.0);
            this.setMouthParameter('ParamMouthOpen', 0.0);
            console.log(`[MOTION_SYNC] Reset mouth parameters to 0`);
        }

        console.log(`[MOTION_SYNC] ✅ Stopped successfully`);
        LAppPal.printMessage('[MOTION_SYNC] Simple motion test stopped');
    }

    /**
     * Check if playing
     */
    public isPlaying(): boolean {
        return this._isPlaying;
    }

    /**
     * Check if initialized
     */
    public isInitialized(): boolean {
        return this._model !== null;
    }

    /**
     * Release resources
     */
    public release(): void {
        this.stop();
        this._model = null;
        console.log(`[MOTION_SYNC] Released`);
    }
} 