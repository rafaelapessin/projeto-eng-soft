// tests/e2e/reserva.e2e.test.js
import puppeteer from 'puppeteer';
import { defineFeature, loadFeature } from 'jest-cucumber';
import path from 'path';
import { fileURLToPath } from 'url';
import { app } from '../../app.js';
import http from 'http';

// const { defineFeature, loadFeature } = require("jest-cucumber");
// const path = require("path");
// const puppeteer = require("puppeteer");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const feature = loadFeature(path.join(__dirname, "../../features/reserva.feature"));

defineFeature( feature, (test)=>{
    let browser, page;

    const filePath = 'http://127.0.0.1:${port}';

    beforeAll(async()=>{
        browser = await puppeteer.launch({
            headless: true, 
            // slowMo: 30,
        });
        page = await browser.newPage();
        await page.goto(filePath);
    });

    afterAll(async()=>{
        await browser.close();
    });

  test('Criar reserva com sucesso', ({ given, when, then, and }) => {

    given('que o usuário acessa a página de nova reserva', async () => {
      await page.goto(`${serverUrl}/nova`);
      const titulo = await page.title();
      expect(titulo).toBe('Nova Reserva');
    });

    when('ele preenche todos os campos corretamente', async () => {
      await page.select('#sala', 'Laboratório de Informática');
      await page.$eval('input[name="dia"]', el => el.value = '2025-10-20');
      await page.$eval('input[name="aula"]', el => el.value = '3');
      await page.$eval('input[name="professor"]', el => el.value = 'João');
      await page.$eval('input[name="disciplina"]', el => el.value = 'Matemática');
      await page.$eval('input[name="turma"]', el => el.value = '1A');
    });

    and('envia o formulário', async () => {
      await page.click('button[type="submit"]');
      await page.waitForSelector('.alert-success');
    });

    then('ele deve ver a mensagem “Reserva concluída com sucesso!"', async () => {
      const msg = await page.$eval('.alert-success h3', el => el.textContent);
      expect(msg).toBe('Reserva concluída com sucesso!');
    });

    and('a reserva deve aparecer na lista de reservas', async () => {
      await page.goto(`${serverUrl}/`);
      const cards = await page.$$eval('.card', cards => cards.length);
      expect(cards).toBeGreaterThan(0);
    });
  });
});
