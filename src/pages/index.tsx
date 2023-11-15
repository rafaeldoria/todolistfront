import { ProtectedLayout } from './ProtectedLayout.tsx/ProtectedLayout'
import { Template } from '@/components/Template'
 
export default function Page() {
  return (    
    <ProtectedLayout>
      <Template.Base>
          <Template.Sidebar></Template.Sidebar>
          <div className='flex flex-col h-screen w-screen'>
            <Template.Topbar title="Task Lists"></Template.Topbar>
            <Template.Content></Template.Content>
          </div>
      </Template.Base>
    </ProtectedLayout>
  )
}