import * as dotenv from 'dotenv';
dotenv.config();
export const environment = {
    supabaseUrl: `${process.env['API_URL']}`,
    supabaseKey:`${process.env['API_KEY']}`
};