<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;

class StorePhotosCategories extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {

        // TODO: VERIFICAR QUE EL USUARIO ESTE AUTENTICADO.

        return true;
    }

    protected function prepareForValidation()
    {
        if ( ! $this->slug && $this->name ) {
            $this->slug = $this->name;
        }

        $this->merge([
            'slug' => Str::slug($this->slug),
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => 'required'
        ];
    }

    // public function attributes()
    // {
    //     return [
    //         'name' => 'Nombre',
    //         'slug' => 'url'
    //     ];
    // }
}
