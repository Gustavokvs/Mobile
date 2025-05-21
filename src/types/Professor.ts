import { Disciplina } from "./Disciplina";

type Professor = {
    id?: string;
    nome: string;
    telefone: number;
    disciplina: Disciplina;
};

export type { Professor };
