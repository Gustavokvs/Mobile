import { Turma } from "./Turma";

type Aluno = {
    id?: string;
    nome: string;
    data_nascimento: number;
    email: string;
    turma: Turma | null;  // Permite que 'turma' seja null
};

export type { Aluno };
