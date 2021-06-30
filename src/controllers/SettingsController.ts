import { Request, Response } from 'express';
import { SettingsService } from '../services/SettingsService';

export class SettingsController {

    private settingsService: SettingsService;

    constructor() {
        this.settingsService = new SettingsService();
    }
    
    async create(req: Request, res: Response) {
        const { chat, username } = req.body;
        
        try {
            const settings = await this.settingsService.create({ chat, username });
            return res.json(settings);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    async findByUsername(req: Request, res: Response) {
        const { username } = req.params;

        const settings = this.settingsService.findByUsername(username);

        return res.json(settings);
    }

    async update(req: Request, res: Response) {
        const { username } = req.params;
        const { chat } = req.body;

        const settings = await this.settingsService.update(username, chat);

        return res.json(settings);
    }
}