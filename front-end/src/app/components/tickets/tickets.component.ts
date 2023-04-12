import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/users.service';

@Component({
    selector: 'tickets',
    templateUrl: './tickets.component.html',
    styleUrls: ['./tickets.component.css']
})
export class TicketsComponent {
    @Input()
    ticketId: number = 1;
    @Input()
    ticketTitle: string = "Ceci est le titre de mon ticket";
    @Input()
    ticketDescription: string = "Ceci est la superbe description de mon ticket";
    @Input()
    ticketState: string = "cancelled";
    @Input()
    ticketUserId: string = "1a960343-d0ec-4f47-a12c-9046f8bde423";
    @Input()
    userRole: string = "admin";

    username: string = "CocoBiturbo";
    
    ticketSub: Subscription = new Subscription();
    constructor(private userService: UserService) { };

    ngOnInit(): void {
        this.ticketSub = this.userService.getUserById(this.ticketUserId).subscribe((response) => {
            console.log("response", response)
        });
    }

    resolved(): void {
        this.ticketState = "resolved"
    }

    pending(): void {
        this.ticketState = "pending"
    }

    cancelled(): void {
        this.ticketState = "cancelled"
    }
}
