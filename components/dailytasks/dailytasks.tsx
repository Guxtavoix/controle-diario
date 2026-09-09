"use client"

import { useState, useEffect } from "react"
import { Card, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Tarefa {
  id: number
  titulo: string
  descricao: string
  prioridade: string
  status: "A fazer" | "Em progresso" | "Concluído"
}

export default function TarefasDiarias() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([])
  const [filtroTipo, setFiltroTipo] = useState("Todos")
  
  const [filtroStatusMultiplo, setFiltroStatusMultiplo] = useState<string[]>([])

  const carregarDados = () => {
    if (typeof window !== "undefined") {
      const tarefasSalvas = localStorage.getItem("tarefas_diarias")
      if (tarefasSalvas) {
        setTarefas(JSON.parse(tarefasSalvas))
      } else {
        const padrao: Tarefa[] = [
          { id: 1, titulo: "Comprar mantimentos", descricao: "Ir ao mercado comprar frutas e verduras.", prioridade: "Média", status: "A fazer" },
          { id: 2, titulo: "Limpar a casa", descricao: "Varrer a sala e organizar o escritório.", prioridade: "Alta", status: "Em progresso" },
          { id: 3, titulo: "Fazer exercícios", descricao: "Treino de pernas e 30 minutos de cardio.", prioridade: "Baixa", status: "Concluído" },
        ]
        localStorage.setItem("tarefas_diarias", JSON.stringify(padrao))
        setTarefas(padrao)
      }

      setFiltroTipo(localStorage.getItem("filtro_tipo") || "Todos")
      
      const statusSalvos = localStorage.getItem("filtro_status_multiplo")
      setFiltroStatusMultiplo(statusSalvos ? JSON.parse(statusSalvos) : [])
    }
  }

  useEffect(() => {
    carregarDados()
    window.addEventListener("tarefas-atualizadas", carregarDados)
    return () => {
      window.removeEventListener("tarefas-atualizadas", carregarDados)
    }
  }, [])

  const alterarStatus = (id: number, novoStatus: "A fazer" | "Em progresso" | "Concluído") => {
    const listaAtualizada = tarefas.map((t) =>
      t.id === id ? { ...t, status: novoStatus } : t
    )
    setTarefas(listaAtualizada)
    localStorage.setItem("tarefas_diarias", JSON.stringify(listaAtualizada))
  }

  const tarefasFiltradas = tarefas.filter((tarefa) => {
    const bateTipo = filtroTipo === "Todos" || tarefa.prioridade === filtroTipo
    
    const bateStatus = filtroStatusMultiplo.length === 0 || filtroStatusMultiplo.includes(tarefa.status)
    
    return bateTipo && bateStatus
  })

  return (
    <div className="p-6 w-full max-w-7xl mx-auto">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Tarefas Diárias</h2>
          <p className="text-muted-foreground">Lista de tarefas para hoje.</p>
        </div>
        
        {(filtroTipo !== "Todos" || filtroStatusMultiplo.length > 0) && (
          <div className="flex flex-wrap gap-2 items-center text-xs bg-slate-100 dark:bg-slate-800 p-2 rounded-lg w-max">
            <span className="text-muted-foreground">Filtros ativos:</span>
            {filtroTipo !== "Todos" && <Badge variant="outline">{filtroTipo}</Badge>}
            {filtroStatusMultiplo.map((st) => (
              <Badge key={st} variant="secondary">{st}</Badge>
            ))}
          </div>
        )}
      </div>

      {tarefasFiltradas.length === 0 ? (
        <div className="text-center py-12 border border-dashed rounded-xl">
          <p className="text-muted-foreground text-sm">Nenhuma tarefa corresponde aos filtros selecionados.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
          {tarefasFiltradas.map((tarefa) => (
            <Card key={tarefa.id} className="w-full flex flex-col justify-between">
              <CardHeader className="space-y-1 pb-2">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base font-semibold line-clamp-1">
                    {tarefa.titulo}
                  </CardTitle>
                  <Badge variant={tarefa.prioridade === "Alta" ? "destructive" : "secondary"}>
                    {tarefa.prioridade}
                  </Badge>
                </div>
                <CardDescription className="line-clamp-2">
                  {tarefa.descricao}
                </CardDescription>
              </CardHeader>
              
              <CardFooter className="flex flex-col items-start gap-2 pt-2 border-t mt-auto">
                <span className="text-xs text-muted-foreground font-medium">Status da tarefa:</span>
                
                <Select 
                  value={tarefa.status} 
                  onValueChange={(value: "A fazer" | "Em progresso" | "Concluído" | null) => {
                    if (value !== null) alterarStatus(tarefa.id, value)
                  }}
                >
                  <SelectTrigger className="w-full h-9 text-sm text-black dark:text-white">
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A fazer">
                      <span className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-slate-400" />
                        A fazer
                      </span>
                    </SelectItem>
                    <SelectItem value="Em progresso">
                      <span className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-blue-500" />
                        Em progresso
                      </span>
                    </SelectItem>
                    <SelectItem value="Concluído">
                      <span className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-green-500" />
                        Concluído
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}