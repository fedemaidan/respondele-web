export interface Pregunta {
  username: string
  date_created: string
  question_id: string
  item_id: string
  item: Object
  status: string
  text: string
  deleted_from_listing: string
  hold: string
  answer: Object
  seller_id: string
  seller_name: string
  preguntas_previas: Object[]
  cantidad_preguntas_previas: string
  from: Object
}