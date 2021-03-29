import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'employee',
        data: { pageTitle: 'compositekeyApp.employee.home.title' },
        loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule),
      },
      {
        path: 'employee-skill',
        data: { pageTitle: 'compositekeyApp.employeeSkill.home.title' },
        loadChildren: () => import('./employee-skill/employee-skill.module').then(m => m.EmployeeSkillModule),
      },
      {
        path: 'certificate-type',
        data: { pageTitle: 'compositekeyApp.certificateType.home.title' },
        loadChildren: () => import('./certificate-type/certificate-type.module').then(m => m.CertificateTypeModule),
      },
      {
        path: 'employee-skill-certificate',
        data: { pageTitle: 'compositekeyApp.employeeSkillCertificate.home.title' },
        loadChildren: () =>
          import('./employee-skill-certificate/employee-skill-certificate.module').then(m => m.EmployeeSkillCertificateModule),
      },
      {
        path: 'task',
        data: { pageTitle: 'compositekeyApp.task.home.title' },
        loadChildren: () => import('./task/task.module').then(m => m.TaskModule),
      },
      {
        path: 'task-comment',
        data: { pageTitle: 'compositekeyApp.taskComment.home.title' },
        loadChildren: () => import('./task-comment/task-comment.module').then(m => m.TaskCommentModule),
      },
      {
        path: 'with-id-string',
        data: { pageTitle: 'compositekeyApp.withIdString.home.title' },
        loadChildren: () => import('./with-id-string/with-id-string.module').then(m => m.WithIdStringModule),
      },
      {
        path: 'with-id-string-details',
        data: { pageTitle: 'compositekeyApp.withIdStringDetails.home.title' },
        loadChildren: () => import('./with-id-string-details/with-id-string-details.module').then(m => m.WithIdStringDetailsModule),
      },
      {
        path: 'with-uuid',
        data: { pageTitle: 'compositekeyApp.withUUID.home.title' },
        loadChildren: () => import('./with-uuid/with-uuid.module').then(m => m.WithUUIDModule),
      },
      {
        path: 'with-uuid-details',
        data: { pageTitle: 'compositekeyApp.withUUIDDetails.home.title' },
        loadChildren: () => import('./with-uuid-details/with-uuid-details.module').then(m => m.WithUUIDDetailsModule),
      },
      {
        path: 'employee-skill-certificate-details',
        data: { pageTitle: 'compositekeyApp.employeeSkillCertificateDetails.home.title' },
        loadChildren: () =>
          import('./employee-skill-certificate-details/employee-skill-certificate-details.module').then(
            m => m.EmployeeSkillCertificateDetailsModule
          ),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
