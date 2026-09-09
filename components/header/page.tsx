"use client";
import { useTheme } from "next-themes";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { List, Filter } from "lucide-react";
import { FieldGroup } from "../ui/field";
import { Label } from "../ui/label";
import { DatePickerSimple } from "../ui/date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export default function Header() {
  const { setTheme, theme } = useTheme();
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const [titulo, setTitulo] = React.useState("");
  const [descricao, setDescricao] = React.useState("");
  const [prioridade, setPrioridade] = React.useState("Média");

  const [filtroTipo, setFiltroTipo] = React.useState("Todos");

  const [filtroStatus, setFiltroStatus] = React.useState({
    "A fazer": false,
    "Em progresso": false,
    Concluído: false,
  });

  const handleMudarFiltroTipo = (novoTipo: string) => {
    setFiltroTipo(novoTipo);
    localStorage.setItem("filtro_tipo", novoTipo);
    window.dispatchEvent(new Event("tarefas-atualizadas"));
  };

  const handleMudarFiltroStatus = (
    statusChave: "A fazer" | "Em progresso" | "Concluído",
  ) => {
    const novosStatus = {
      ...filtroStatus,
      [statusChave]: !filtroStatus[statusChave],
    };
    setFiltroStatus(novosStatus);

    const statusAtivos = Object.keys(novosStatus).filter(
      (key) => novosStatus[key as keyof typeof filtroStatus],
    );

    localStorage.setItem(
      "filtro_status_multiplo",
      JSON.stringify(statusAtivos),
    );
    window.dispatchEvent(new Event("tarefas-atualizadas"));
  };

  const handleCriarTarefa = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo.trim()) return;

    const novaTarefa = {
      id: Date.now(),
      titulo: titulo,
      descricao: descricao || "Sem descrição fornecida.",
      prioridade: prioridade,
      status: "A fazer",
    };

    const tarefasAtuais = JSON.parse(
      localStorage.getItem("tarefas_diarias") || "[]",
    );
    const listaAtualizada = [novaTarefa, ...tarefasAtuais];

    localStorage.setItem("tarefas_diarias", JSON.stringify(listaAtualizada));
    window.dispatchEvent(new Event("tarefas-atualizadas"));

    setTitulo("");
    setDescricao("");
    setPrioridade("Média");
    setDialogOpen(false);
  };

  return (
    <header className="bg-linear-to-r from-[#363c55] to-[#3c4150] text-white p-4 flex justify-between items-center dark:from-slate-900 dark:to-slate-800">
      <h1 className="text-xl font-bold">Controle Diário</h1>

      <div className="flex items-center gap-2">
        <Button
          className="h-10 w-25 rounded-full bg-white/10 text-white hover:bg-white/15 hover:text-white"
          onClick={() => setDialogOpen(true)}
        >
          Criar Tarefa
        </Button>

        <DropdownMenu modal={false}>
          <DropdownMenuTrigger className="h-10 w-15 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/15 hover:text-white transition-colors cursor-pointer">
            <List className="font-bold h-8 w-8" />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="flex items-center gap-1.5 text-blue-500 dark:text-blue-400">
                <Filter className="h-3.5 w-3.5" /> Filtrar por Tipo
              </DropdownMenuLabel>
              <DropdownMenuRadioGroup
                value={filtroTipo}
                onValueChange={handleMudarFiltroTipo}
              >
                <DropdownMenuRadioItem value="Todos">
                  Todos
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Baixa">
                  Baixa
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Média">
                  Média
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Alta">Alta</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuLabel className="flex items-center gap-1.5 text-blue-500 dark:text-blue-400">
                <Filter className="h-3.5 w-3.5" /> Filtrar por Status
              </DropdownMenuLabel>

              <DropdownMenuCheckboxItem
                checked={filtroStatus["A fazer"]}
                onCheckedChange={() => handleMudarFiltroStatus("A fazer")}
              >
                A fazer
              </DropdownMenuCheckboxItem>

              <DropdownMenuCheckboxItem
                checked={filtroStatus["Em progresso"]}
                onCheckedChange={() => handleMudarFiltroStatus("Em progresso")}
              >
                Em progresso
              </DropdownMenuCheckboxItem>

              <DropdownMenuCheckboxItem
                checked={filtroStatus["Concluído"]}
                onCheckedChange={() => handleMudarFiltroStatus("Concluído")}
              >
                Concluído
              </DropdownMenuCheckboxItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuLabel>Modo Exibição</DropdownMenuLabel>
              <DropdownMenuRadioGroup
                value={theme ?? "system"}
                onValueChange={(value) => setTheme(value)}
              >
                <DropdownMenuRadioItem value="light">
                  Claro
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="dark">
                  Escuro
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="system">
                  Sistema
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent onCloseAutoFocus={(e) => e.preventDefault()}>
          <form onSubmit={handleCriarTarefa}>
            <React.Fragment>
              <DialogHeader>
                <DialogTitle>Criar Tarefa</DialogTitle>
                <DialogDescription>
                  Preencha os detalhes da tarefa e clique em "Criar" para
                  adicioná-la à sua lista.
                </DialogDescription>
              </DialogHeader>

              <FieldGroup className="py-4">
                <Label htmlFor="new-task-title">
                  Título da Tarefa <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="new-task-title"
                  placeholder="Digite o título da tarefa"
                  className="w-full rounded-md border border-gray-300 p-2 text-black dark:text-white"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  required
                />

                <Label htmlFor="new-task-description">
                  Descrição da Tarefa
                </Label>
                <Input
                  id="new-task-description"
                  placeholder="Digite a descrição da tarefa"
                  className="w-full rounded-md border border-gray-300 p-2 text-black dark:text-white"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />

                <Label htmlFor="new-task-type">
                  Tipo de Tarefa <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={prioridade}
                  onValueChange={(value) => setPrioridade(value || "Média")}
                >
                  <SelectTrigger
                    id="new-task-type"
                    className="w-full rounded-md border border-gray-300 p-2 text-black dark:text-white"
                  >
                    <SelectValue placeholder="Selecione o tipo de tarefa" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Baixa">Baixa</SelectItem>
                    <SelectItem value="Média">Média</SelectItem>
                    <SelectItem value="Alta">Alta</SelectItem>
                  </SelectContent>
                </Select>

                <Label htmlFor="new-task-due-date">Data de Vencimento</Label>
                <DatePickerSimple />
              </FieldGroup>

              <DialogFooter>
                <Button
                  type="submit"
                  className="bg-blue-600 text-white hover:bg-blue-700 w-full sm:w-auto"
                >
                  Criar
                </Button>
              </DialogFooter>
            </React.Fragment>
          </form>
        </DialogContent>
      </Dialog>
    </header>
  );
}