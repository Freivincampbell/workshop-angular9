import {Component, TemplateRef} from '@angular/core';
import {Apollo} from 'apollo-angular';
import { map } from 'rxjs/operators';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import * as Query from './global-query';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    modalRef: BsModalRef;
    users: Array<any> = []; // List of Users
    user: any = {};
    lastName: any;
    name: any;

    constructor(private apollo: Apollo,
                private modalService: BsModalService) { }

    ngOnInit() {
        this.getUsers();
    }

     // Get users
     getUsers() {
        this.apollo.watchQuery({ query: Query.Users })
            .valueChanges
            .pipe(map((result: any) =>   {
                this.users = result.data.users;
            }))
            .subscribe();
    }


    // Create user
    createUser({name, lastName}: { name: string, lastName: string }) {
        this.apollo
            .mutate({
                mutation: Query.addUser,
                variables: {
                    name: name,
                    lastName: lastName
                },
                update: (proxy, { data: user}) => {
                    // Read the data from our cache.
                    const data: any = proxy.readQuery({ query: Query.Users });

                    // Update cache.
                    data.users.push(user['addUser']);

                    // Write our data back to the cache.
                    proxy.writeQuery({ query: Query.Users, data });
                }
            })
            .subscribe(({ data }) => {
                console.log(data);
                this.closeModal(); // Close Modal
            }, (error) => {
                console.log('there was an error sending the query', error);
            });
    }

    // Delete user
    removeUser({id}: {id: string}) {
        console.log(id);
        this.apollo
            .mutate({
                mutation: Query.removeUser,
                variables: {
                    id: id
                },
                update: (proxy, { data:  removeUser  }) => {

                    // Read the data from our cache for this query.
                    const data: any = proxy.readQuery({ query: Query.Users });

                    const index = data.users.map(user =>  user.id ).indexOf(id);

                    data.users.splice(index, 1);

                    // Write our data back to the cache.
                    proxy.writeQuery({ query: Query.Users, data });
                }
            })
            .subscribe(({ data }) => {
                console.log(data);
            }, (error) => {
                console.log('there was an error sending the query', error);
            });
    }

    // Show form with user info
    showEditUserForm(user, template) {
        this.name = user.name;
        this.lastName = user.lastName;
        this.user = user;
        this.modalRef = this.modalService.show(template);
    }

    // Open Modal
    openModal(template: TemplateRef<any>) {
        this.name = '';
        this.lastName = '';
        this.user = {};
        this.modalRef = this.modalService.show(template);
    }

    // Close Modal
    closeModal() {
        this.modalRef.hide();
        this.modalRef = null;
    }
}


