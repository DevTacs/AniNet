import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/anime/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/anime/"!</div>
}
