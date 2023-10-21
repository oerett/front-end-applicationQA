import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'jobFilter'
})
export class JobFilterPipe implements PipeTransform {
    transform(jobs: any[], searchTerm: string): any[] {
        if (!jobs) return [];
        if (!searchTerm) return jobs;

        searchTerm = searchTerm.toLowerCase();

        return jobs.filter(job => {
            return job.jobDescription.toLowerCase().includes(searchTerm) || 
                   job.jobLongDescription.toLowerCase().includes(searchTerm);
        });
    }
}
