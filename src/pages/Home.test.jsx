import { describe, it, expect, Experimental } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from './Home';

describe('Prueba del entorno de testing', ()=>{
    it('funciona correctamente', ()=>{
    
        expect(1+1).toBe(2);
    })
})